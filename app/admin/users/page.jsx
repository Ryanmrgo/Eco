"use client";
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const mockUsers = [
  { id: 1, name: "Alice Smith", email: "alice@email.com", status: "active" },
  { id: 2, name: "Bob Johnson", email: "bob@email.com", status: "blocked" },
  { id: 3, name: "Charlie Lee", email: "charlie@email.com", status: "active" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  function handleAdd() {
    setUsers([...users, { id: Date.now(), name: form.name, email: form.email, status: "active" }]);
    setForm({ name: "", email: "" });
    setShowAdd(false);
  }
  function handleEdit() {
    setUsers(users.map(u => u.id === showEdit ? { ...u, ...form } : u));
    setShowEdit(null);
    setForm({ name: "", email: "" });
  }
  function handleDelete(id) {
    setUsers(users.filter(u => u.id !== id));
  }
  function handleBlock(id) {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "blocked" : "active" } : u));
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      <div className="flex items-center gap-4 mb-4">
        <input
          className="border px-2 py-1 rounded"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={() => setShowAdd(true)}>Add User</button>
      </div>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                <span className={u.status === "active" ? "text-green-600" : "text-red-600"}>{u.status}</span>
              </td>
              <td className="p-2 flex gap-2">
                <button className="text-blue-600" onClick={() => { setShowDetails(u); }}>View</button>
                <button className="text-yellow-600" onClick={() => { setShowEdit(u.id); setForm({ name: u.name, email: u.email }); }}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(u.id)}>Delete</button>
                <button className="text-gray-600" onClick={() => handleBlock(u.id)}>{u.status === "active" ? "Block" : "Unblock"}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Add User</h2>
            <input className="border w-full mb-2 px-2 py-1 rounded" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="border w-full mb-4 px-2 py-1 rounded" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <div className="flex gap-2 justify-end">
              <button className="px-3 py-1" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={handleAdd}>Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <input className="border w-full mb-2 px-2 py-1 rounded" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="border w-full mb-4 px-2 py-1 rounded" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <div className="flex gap-2 justify-end">
              <button className="px-3 py-1" onClick={() => setShowEdit(null)}>Cancel</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleEdit}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">User Details</h2>
            <div className="mb-2"><b>Name:</b> {showDetails.name}</div>
            <div className="mb-2"><b>Email:</b> {showDetails.email}</div>
            <div className="mb-4"><b>Status:</b> <span className={showDetails.status === "active" ? "text-green-600" : "text-red-600"}>{showDetails.status}</span></div>
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
