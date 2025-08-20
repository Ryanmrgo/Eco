"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReportWaste = () => {
  const Map = dynamic(() => import("@/components/map/Map"), { ssr: false });
  return (
  <div className="flex flex-col items-center justify-center py-10 w-full">
      <h1 className="text-3xl font-bold mb-6">Report Waste</h1>
      <div className="w-full" style={{ maxWidth: 900, minHeight: 500 }}>
        <Map />
      </div>
    </div>
  );
};

export default ReportWaste;
