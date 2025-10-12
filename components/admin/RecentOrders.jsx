"use client";

import React, { useEffect, useState } from 'react';

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/order/list');
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) return <div className="my-8 text-center">Loading orders...</div>;
  if (error) return <div className="my-8 text-center text-red-600">{error}</div>;

  return (
    <section className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Recent Orders</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">User Email</th>
            <th className="pb-2">Product(s)</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.slice(0, 5).map((order) => (
            <tr key={order._id} className="border-t">
              <td className="py-2">{order.userEmail || 'N/A'}</td>
              <td className="py-2">{order.items ? order.items.map(i => i.product?.name || 'Product').join(', ') : 'N/A'}</td>
              <td className="py-2">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
              <td className="py-2">
                <span className={`px-2 py-1 rounded text-xs ${order.status === 'Delivered' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{order.status || 'Pending'}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RecentOrders;
