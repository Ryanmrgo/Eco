"use client";
import React, { useEffect, useState } from 'react';

const AdminSidebar = () => {
  const [role, setRole] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("admin-role") || "");
    }
  }, []);
  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white flex flex-col p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Eco Hive Admin</h2>
      {role && (
        <div className="text-green-300 text-sm mb-6">Role: <span className="font-semibold">{role.charAt(0).toUpperCase() + role.slice(1)}</span></div>
      )}
      <nav className="flex flex-col gap-6 flex-1">
        <a href="/admin/dashboard" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition">Dashboard</a>
        <a href="/admin/waste-reports" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition">Waste Reports</a>
        <a href="/admin/users" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition">Users</a>
        <a href="/admin/products" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition">Products</a>
        <a href="/admin/orders" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition">Orders</a>
        <a href="/admin/settings" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition">Settings</a>
        <a href="/admin/notifications" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-pink-400 transition">Notifications</a>
        <a href="/admin/profile" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-purple-400 transition">Profile</a>
        <a href="/admin/admins" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-blue-400 transition">Admin Management</a>
        <a href="/admin/audit-logs" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-yellow-400 transition">Audit Logs</a>
      </nav>
      <div className="mt-8 flex justify-center">
        <img src="/assets/logo.png" alt="Eco Hive Logo" className="h-12 w-auto" />
      </div>
    </aside>
  );
};

export default AdminSidebar;
