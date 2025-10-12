"use client";

import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminWasteReports from "@/components/AdminWasteReports";


const AdminWastePage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 py-10 px-8">
        <AdminWasteReports />
      </div>
    </div>
  );
};

export default AdminWastePage;
