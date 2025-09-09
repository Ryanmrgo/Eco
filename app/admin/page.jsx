"use client";
import React from "react";
import AdminWasteReports from "@/components/AdminWasteReports";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <AdminWasteReports />
    </div>
  );
};

export default AdminPage;
