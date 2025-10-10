
"use client";
import React from 'react';
import { useClerk } from "@clerk/nextjs";

const AdminHeader = () => {
  const { signOut } = useClerk();
  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4">
      <h1 className="text-3xl font-bold text-green-700">Eco Hive Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Admin</span>
        <img src="/assets/user_icon.svg" className="w-8 h-8 rounded-full" />
        <button
          onClick={signOut}
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
