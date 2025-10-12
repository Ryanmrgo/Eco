"use client";

import React, { useEffect, useState } from 'react';

const StatsOverview = () => {
  const [stats, setStats] = useState([
    { label: 'Total Users', value: '...' },
    { label: 'Total Products', value: '...' },
    { label: 'Waste Reports', value: '...' },
    { label: 'Orders', value: '...' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all stats in parallel
        const [usersRes, productsRes, wasteRes, ordersRes] = await Promise.all([
          fetch('/api/user/data/all'), // You may need to create this endpoint
          fetch('/api/product/list'),
          fetch('/api/waste-report/list'), // You may need to create this endpoint
          fetch('/api/order/list'),
        ]);

        const usersData = await usersRes.json();
        const productsData = await productsRes.json();
        const wasteData = await wasteRes.json();
        const ordersData = await ordersRes.json();

        setStats([
          { label: 'Total Users', value: usersData.users ? usersData.users.length : 0 },
          { label: 'Total Products', value: productsData.products ? productsData.products.length : 0 },
          { label: 'Waste Reports', value: wasteData.reports ? wasteData.reports.length : 0 },
          { label: 'Orders', value: ordersData.orders ? ordersData.orders.length : 0 },
        ]);
      } catch (err) {
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div className="my-8 text-center">Loading stats...</div>;
  }
  if (error) {
    return <div className="my-8 text-center text-red-600">{error}</div>;
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
          <p className="text-2xl font-bold text-green-700 mt-2">{stat.value}</p>
        </div>
      ))}
    </section>
  );
};

export default StatsOverview;
