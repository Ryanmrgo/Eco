"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import WasteReportForm from "@/components/WasteReportForm";
import WasteReportList from "@/components/WasteReportList";
import WasteReportMapMarkers from "@/components/WasteReportMapMarkers";

const Map = dynamic(() => import("@/components/map/Map"), { ssr: false });

const ReportWaste = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { isSignedIn } = useUser();

  const handleWasteReport = (location) => {
    if (!isSignedIn) {
      toast.error("You must sign in to use this function.");
      return;
    }
    setSelectedLocation(location);
    setModalOpen(true);
  };

  const handleFormSubmit = (data) => {
    // TODO: send data to backend or API
    alert(`Waste report submitted for ${data.locationName}!`);
    setModalOpen(false);
    setSelectedLocation(null);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedLocation(null);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full">
      <h1 className="text-3xl font-bold mb-6">Report Waste</h1>
      <div className="w-full" style={{ maxWidth: 900, minHeight: 500, position: 'relative' }}>
  <Map onWasteReport={handleWasteReport} />
  <WasteReportMapMarkers />
        {modalOpen && selectedLocation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                onClick={handleClose}
                aria-label="Close"
              >
                &times;
              </button>
              <WasteReportForm
                locationName={selectedLocation.name}
                lng={selectedLocation.lng}
                lat={selectedLocation.lat}
                onSubmit={handleFormSubmit}
              />
            </div>
          </div>
        )}
      </div>
      <WasteReportList />
    </div>
  );
};

export default ReportWaste;
