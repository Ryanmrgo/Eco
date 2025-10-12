import React from 'react';

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white flex flex-col p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Eco Hive Admin</h2>
      <nav className="flex flex-col gap-6 flex-1">
        <a href="/admin/dashboard" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition">Dashboard</a>
        <a href="/admin/waste-reports" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition">Waste Reports</a>
        <a href="/admin/users" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition">Users</a>
        <a href="/admin/products" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition">Products</a>
        <a href="/admin/orders" className="py-2 px-4 rounded hover:bg-gray-700 hover:text-green-400 transition">Orders</a>
      </nav>
      <div className="mt-8 flex justify-center">
        <img src="/assets/logo.png" alt="Eco Hive Logo" className="h-12 w-auto" />
      </div>
    </aside>
  );
};

export default AdminSidebar;
