import React from 'react';

const AdminHeader = () => {
  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4">
      <h1 className="text-3xl font-bold text-green-700">Eco Hive Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Admin</span>
        <img src="/assets/user_icon.svg"  className="w-8 h-8 rounded-full" />
      </div>
    </header>
  );
};

export default AdminHeader;
