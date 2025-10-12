'use client';

import { useEffect, useRef } from 'react';

interface MapProps {
  onWasteReport?: (location: { name: string; lng: number; lat: number }) => void;
}

export default function Map({ onWasteReport }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

  if (!mapRef.current || !(mapRef.current instanceof HTMLElement)) return;

    const fallbackCoords = { lng: 96.09190782286511, lat: 21.937942995500503 };

    const initMap = (center: { lng: number; lat: number }) => {
      try {
        // Wait for maplibregl to be loaded
        if (!(window as any).maplibregl) {
          setTimeout(() => initMap(center), 100);
          return;
        }
        const map = new (window as any).maplibregl.Map({
          container: mapRef.current!,
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [center.lng, center.lat],
          zoom: 12,
        });

        map.on('error', (e: any) => {
          // Log maplibre errors
          console.error('MapLibre error:', e && e.error ? e.error : e);
        });

        map.addControl(new (window as any).maplibregl.NavigationControl());

        // Create a marker and set to initial position
        const marker = new (window as any).maplibregl.Marker({ draggable: false })
          .setLngLat([center.lng, center.lat])
          .addTo(map);

        // Show coordinates under cursor
        let coordDiv = document.getElementById('map-coords');
        if (!coordDiv) {
          coordDiv = document.createElement('div');
          coordDiv.id = 'map-coords';
          coordDiv.style.position = 'absolute';
          coordDiv.style.bottom = '10px';
          coordDiv.style.left = '10px';
          coordDiv.style.background = 'rgba(255,255,255,0.8)';
          coordDiv.style.padding = '4px 8px';
          coordDiv.style.borderRadius = '4px';
          coordDiv.style.fontSize = '14px';
          coordDiv.style.zIndex = '999';
          mapRef.current!.appendChild(coordDiv);
        }

        map.on('mousemove', (e: any) => {
          if (coordDiv) {
            coordDiv.textContent = `Lng: ${e.lngLat.lng.toFixed(6)}, Lat: ${e.lngLat.lat.toFixed(6)}`;
          }
        });

        // Move marker and center on map click, show place name in popup
        map.on('click', async (e: any) => {
          marker.setLngLat(e.lngLat);
          map.flyTo({ center: e.lngLat });

          // Reverse geocode using Nominatim
          const lng = e.lngLat.lng;
          const lat = e.lngLat.lat;
          let placeName = 'Unknown location';
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
            if (response.ok) {
              const data = await response.json();
              if (data.display_name) {
                placeName = data.display_name;
              }
            }
          } catch (err) {
            placeName = 'Could not fetch place name';
            console.error('Reverse geocoding error:', err);
          }

          // Remove any existing popup from marker
          if (marker.getPopup()) {
            marker.getPopup().remove();
          }

          // Show popup with place name and Waste Report button
          const popup = new (window as any).maplibregl.Popup({ offset: 25 })
            .setHTML(`
              <div style="max-width:250px;background:skyblue;color:white;padding:8px 12px;border-radius:6px;display:flex;flex-direction:column;align-items:flex-start;">
                <strong>${placeName}</strong>
                <button id="waste-report-btn" style="margin-top:10px;padding:6px 14px;background:gray;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:14px;">Waste Report</button>
              </div>
            `);
          marker.setPopup(popup);
          marker.togglePopup();

          // Add a click event for the button (delegated)
          setTimeout(() => {
            const btn = document.getElementById('waste-report-btn');
            if (btn) {
              btn.onclick = () => {
                if (onWasteReport) {
                  onWasteReport({ name: placeName, lng, lat });
                }
              };
            }
          }, 0);
        });
      } catch (err) {
        console.error('Map initialization error:', err);
      }
    };

    const loadMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            initMap({
              lng: position.coords.longitude,
              lat: position.coords.latitude,
            });
          },
          (error) => {
            console.warn('Geolocation error:', error.message);
            initMap(fallbackCoords);
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      } else {
        console.warn('Geolocation not supported.');
        initMap(fallbackCoords);
      }
    };

    // Here, we load MapLibre script dynamically #Yan
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.js';
    script.onload = loadMap;
    document.head.appendChild(script);

    // MapLibre CSS
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '500px',
        margin: 0,
        padding: 0,
      }}
    ></div>
  );
}
