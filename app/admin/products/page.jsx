"use client";
import { useState } from "react";

const mockProducts = [
  { id: 1, name: "Eco Water Bottle", seller: "Alice Smith", status: "pending" },
  { id: 2, name: "Reusable Bag", seller: "Bob Johnson", status: "approved" },
  { id: 3, name: "Solar Charger", seller: "Charlie Lee", status: "pending" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [tab, setTab] = useState("pending");

  function handleApprove(id) {
    setProducts(products.map(p => p.id === id ? { ...p, status: "approved" } : p));
  }
  function handleReject(id) {
    setProducts(products.filter(p => p.id !== id));
  }

  const filtered = products.filter(p => p.status === tab);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <div className="flex gap-4 mb-6">
        <button className={`px-4 py-2 rounded ${tab === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"}`} onClick={() => setTab("pending")}>Pending Approval</button>
        <button className={`px-4 py-2 rounded ${tab === "approved" ? "bg-green-600 text-white" : "bg-gray-200"}`} onClick={() => setTab("approved")}>Approved</button>
      </div>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Product</th>
            <th className="p-2">Seller</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan={4} className="text-center p-4">No products found.</td></tr>
          )}
          {filtered.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.seller}</td>
              <td className="p-2">
                <span className={p.status === "approved" ? "text-green-600" : "text-yellow-600"}>{p.status}</span>
              </td>
              <td className="p-2 flex gap-2">
                {tab === "pending" && <>
                  <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => handleApprove(p.id)}>Approve</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleReject(p.id)}>Reject</button>
                </>}
                {tab === "approved" && <span className="text-gray-400">No actions</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
