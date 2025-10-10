"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const mockOrders = [
  { id: 1, user: "Alice Smith", product: "Eco Water Bottle", amount: 2, status: "delivered", date: "2025-09-20" },
  { id: 2, user: "Bob Johnson", product: "Reusable Bag", amount: 1, status: "pending", date: "2025-09-22" },
  { id: 3, user: "Charlie Lee", product: "Solar Charger", amount: 1, status: "shipped", date: "2025-09-23" },
];

export default function OrdersPage() {
  const [orders] = useState(mockOrders);
  const [showDetails, setShowDetails] = useState(null);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Order ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Product</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-t">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.user}</td>
              <td className="p-2">{o.product}</td>
              <td className="p-2">{o.amount}</td>
              <td className="p-2">
                <span className={o.status === "delivered" ? "text-green-600" : o.status === "shipped" ? "text-blue-600" : "text-yellow-600"}>{o.status}</span>
              </td>
              <td className="p-2">{o.date}</td>
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
            <div className="mb-2"><b>Order ID:</b> {showDetails.id}</div>
            <div className="mb-2"><b>User:</b> {showDetails.user}</div>
            <div className="mb-2"><b>Product:</b> {showDetails.product}</div>
            <div className="mb-2"><b>Amount:</b> {showDetails.amount}</div>
            <div className="mb-2"><b>Status:</b> <span className={showDetails.status === "delivered" ? "text-green-600" : showDetails.status === "shipped" ? "text-blue-600" : "text-yellow-600"}>{showDetails.status}</span></div>
            <div className="mb-4"><b>Date:</b> {showDetails.date}</div>
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
