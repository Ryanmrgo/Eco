import React, { useEffect, useRef } from 'react';

const DEFAULT_POLL_INTERVAL = 3000;

export default function WasteReportMapMarkers({ pollInterval = DEFAULT_POLL_INTERVAL }) {
  const popupRef = useRef(null);
  const sourceId = 'waste-reports-source';
  const unconfirmedLayer = 'waste-reports-unconfirmed';
  const confirmedLayer = 'waste-reports-confirmed';
  const intervalRef = useRef(null);

  useEffect(() => {
    let stopped = false;

    const getMap = () => {
      if (typeof window === 'undefined') return null;
      if (window.mapInstance) return window.mapInstance;
      if (window.maplibregl && window.maplibregl._lastMapInstance) return window.maplibregl._lastMapInstance;
      const el = document.querySelector('[id^="maplibregl-map"]');
      if (el && el.__map__) return el.__map__;
      return null;
    };

    const ensureLayers = (map) => {
      // maplibre requires the style to be loaded before adding sources/layers
      if (typeof map.isStyleLoaded === 'function' && !map.isStyleLoaded()) {
        map.once('load', () => ensureLayers(map));
        return;
      }
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      }

      if (!map.getLayer(unconfirmedLayer)) {
        map.addLayer({
          id: unconfirmedLayer,
          type: 'circle',
          source: sourceId,
          paint: {
            'circle-radius': 8,
            'circle-color': '#ef4444',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff',
            'circle-opacity': 0.9,
          },
          filter: ['!', ['get', 'confirmed']],
        });
      }

      if (!map.getLayer(confirmedLayer)) {
        map.addLayer({
          id: confirmedLayer,
          type: 'circle',
          source: sourceId,
          paint: {
            'circle-radius': 8,
            'circle-color': '#16a34a',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff',
            'circle-opacity': 0.9,
          },
          filter: ['get', 'confirmed'],
        });
      }
    };

    const createPopup = (map) => {
      if (!popupRef.current && window.maplibregl) popupRef.current = new window.maplibregl.Popup({ closeButton: true, closeOnClick: false });
      return popupRef.current;
    };

    const sync = async () => {
      if (stopped) return;
      const map = getMap();
      if (!map) return;

      try {
        const res = await fetch('/api/waste-report');
        if (!res.ok) return;
        const data = await res.json();
        const reports = Array.isArray(data.reports) ? data.reports : (data || []);

        const features = reports
          .filter(r => r && typeof r.lng === 'number' && typeof r.lat === 'number')
          .map(r => ({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [r.lng, r.lat] },
            properties: { id: r._id || r.id, locationName: r.locationName, photoUrl: r.photoUrl, confirmed: !!r.confirmed, createdAt: r.createdAt }
          }));

        const src = map.getSource(sourceId);
        if (src && src.setData) {
          src.setData({ type: 'FeatureCollection', features });
        }
      } catch (e) {
        // ignore
      }
    };

    const onMouseEnter = (e) => {
      const map = getMap();
      if (!map) return;
      const features = map.queryRenderedFeatures(e.point, { layers: [unconfirmedLayer, confirmedLayer] });
      if (!features || !features.length) return;
      const f = features[0];
      const popup = createPopup(map);
      const statusText = f.properties.confirmed ? 'Confirmed' : 'Unconfirmed';
      const statusColor = f.properties.confirmed ? '#16a34a' : '#ef4444';
      popup.setLngLat(f.geometry.coordinates)
        .setHTML(`<div style="max-width:240px"><div style="display:flex;align-items:center;justify-content:space-between"><strong>${f.properties.locationName || 'Location'}</strong><span style=\"background:${statusColor};color:#fff;padding:2px 8px;border-radius:12px;font-size:12px\">${statusText}</span></div><div style="font-size:12px;color:#666;margin-top:6px">${new Date(f.properties.createdAt).toLocaleString()}</div></div>`)
        .addTo(map);
    };

    const onMouseLeave = () => {
      if (popupRef.current) popupRef.current.remove();
    };

    const onClick = (e) => {
      const map = getMap();
      if (!map) return;
      const features = map.queryRenderedFeatures(e.point, { layers: [unconfirmedLayer, confirmedLayer] });
      if (!features || !features.length) return;
      const f = features[0];
      const popup = createPopup(map);
      const statusText = f.properties.confirmed ? 'Confirmed' : 'Unconfirmed';
      const statusColor = f.properties.confirmed ? '#16a34a' : '#ef4444';
      popup.setLngLat(f.geometry.coordinates)
        .setHTML(`<div style="max-width:320px"><div style="display:flex;align-items:center;justify-content:space-between"><strong>${f.properties.locationName || 'Location'}</strong><span style=\"background:${statusColor};color:#fff;padding:4px 10px;border-radius:12px;font-size:13px\">${statusText}</span></div><div style=\"font-size:12px;color:#666;margin-top:6px\">${new Date(f.properties.createdAt).toLocaleString()}</div>${f.properties.photoUrl ? `<div style=\"margin-top:8px\"><img src=\"${f.properties.photoUrl}\" style=\"width:100%;border-radius:6px\"/></div>` : ''}</div>`)
        .addTo(map);
    };

    const start = async () => {
      const map = getMap();
      if (!map) {
        setTimeout(start, 300);
        return;
      }
      // If style isn't loaded yet, wait for it before creating layers and syncing
      if (typeof map.isStyleLoaded === 'function' && !map.isStyleLoaded()) {
        map.once('load', async () => {
          ensureLayers(map);
          await sync();
          intervalRef.current = setInterval(sync, pollInterval);
        });
        return;
      }
      ensureLayers(map);
      await sync();
      intervalRef.current = setInterval(sync, pollInterval);
    };

    const tryAttachEvents = () => {
      const map = getMap();
      if (!map) {
        setTimeout(tryAttachEvents, 300);
        return;
      }
      try {
        // Attach after style/load if necessary so layers exist
        if (typeof map.isStyleLoaded === 'function' && !map.isStyleLoaded()) {
          map.once('load', () => {
            ensureLayers(map);
            try {
              map.on('mouseenter', unconfirmedLayer, onMouseEnter);
              map.on('mouseleave', unconfirmedLayer, onMouseLeave);
              map.on('mouseenter', confirmedLayer, onMouseEnter);
              map.on('mouseleave', confirmedLayer, onMouseLeave);
              map.on('click', unconfirmedLayer, onClick);
              map.on('click', confirmedLayer, onClick);
            } catch (err) {}
          });
        } else {
          ensureLayers(map);
          map.on('mouseenter', unconfirmedLayer, onMouseEnter);
          map.on('mouseleave', unconfirmedLayer, onMouseLeave);
          map.on('mouseenter', confirmedLayer, onMouseEnter);
          map.on('mouseleave', confirmedLayer, onMouseLeave);
          map.on('click', unconfirmedLayer, onClick);
          map.on('click', confirmedLayer, onClick);
        }
      } catch (e) {}
    };

    start();
    tryAttachEvents();

    return () => {
      stopped = true;
      const map = getMap();
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (map) {
        try { map.off('mouseenter', unconfirmedLayer, onMouseEnter); } catch (e) {}
        try { map.off('mouseleave', unconfirmedLayer, onMouseLeave); } catch (e) {}
        try { map.off('mouseenter', confirmedLayer, onMouseEnter); } catch (e) {}
        try { map.off('mouseleave', confirmedLayer, onMouseLeave); } catch (e) {}
        try { map.off('click', unconfirmedLayer, onClick); } catch (e) {}
        try { map.off('click', confirmedLayer, onClick); } catch (e) {}
        try { if (map.getLayer(unconfirmedLayer)) map.removeLayer(unconfirmedLayer); } catch (e) {}
        try { if (map.getLayer(confirmedLayer)) map.removeLayer(confirmedLayer); } catch (e) {}
        try { if (map.getSource(sourceId)) map.removeSource(sourceId); } catch (e) {}
      }
      if (popupRef.current) {
        try { popupRef.current.remove(); } catch (e) {}
        popupRef.current = null;
      }
    };
  }, [pollInterval]);

  return null;
}
