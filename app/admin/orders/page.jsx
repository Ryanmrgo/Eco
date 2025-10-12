"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";


import { useEffect } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
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

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Order ID</th>
            <th className="p-2">User Email</th>
            <th className="p-2">Product</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={7} className="text-center p-4">Loading orders...</td></tr>
          ) : error ? (
            <tr><td colSpan={7} className="text-center text-red-600 p-4">{error}</td></tr>
          ) : orders.length === 0 ? (
            <tr><td colSpan={7} className="text-center p-4">No orders found.</td></tr>
          ) : orders.map(o => (
            <tr key={o._id} className="border-t">
              <td className="p-2">{o._id}</td>
              <td className="p-2">{o.userEmail || 'N/A'}</td>
              <td className="p-2">{o.items ? o.items.map(i => i.product?.name || 'Product').join(', ') : 'N/A'}</td>
              <td className="p-2">{o.items ? o.items.reduce((sum, i) => sum + (i.quantity || 1), 0) : 'N/A'}</td>
              <td className="p-2">
                <span className={o.status === "Delivered" ? "text-green-600" : o.status === "Shipped" ? "text-blue-600" : "text-yellow-600"}>{o.status || 'Pending'}</span>
              </td>
              <td className="p-2">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'N/A'}</td>
              <td className="p-2">
                <button className="text-blue-600" onClick={() => setShowDetails(o)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Order Details</h2>
            <div className="mb-2"><b>Order ID:</b> {showDetails._id}</div>
            <div className="mb-2"><b>User Email:</b> {showDetails.userEmail || 'N/A'}</div>
            <div className="mb-2"><b>Product(s):</b> {showDetails.items ? showDetails.items.map(i => i.product?.name || 'Product').join(', ') : 'N/A'}</div>
            <div className="mb-2"><b>Amount:</b> {showDetails.items ? showDetails.items.reduce((sum, i) => sum + (i.quantity || 1), 0) : 'N/A'}</div>
            <div className="mb-2"><b>Status:</b> <span className={showDetails.status === "Delivered" ? "text-green-600" : showDetails.status === "Shipped" ? "text-blue-600" : "text-yellow-600"}>{showDetails.status || 'Pending'}</span></div>
            <div className="mb-4"><b>Date:</b> {showDetails.createdAt ? new Date(showDetails.createdAt).toLocaleDateString() : 'N/A'}</div>
            <div className="flex gap-2 justify-end">
              <button className="px-3 py-1" onClick={() => setShowDetails(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
