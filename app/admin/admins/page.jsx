"use client";
import { useEffect, useState } from "react";

const mockAdmins = [
  { id: 1, name: "Alice Smith", role: "superadmin" },
  { id: 2, name: "Bob Johnson", role: "moderator" },
];

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState(mockAdmins);
  const [role, setRole] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", role: "moderator" });
  const [editAdminId, setEditAdminId] = useState(null);
  const [editAdmin, setEditAdmin] = useState({ name: "", role: "moderator" });
  const [showDeleteId, setShowDeleteId] = useState(null);

  // Helper: Write audit log to localStorage (with IP, status, eventType)
  const addAuditLog = async (action, target, status = "success", eventType = "admin") => {
    let ip = "local";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      ip = data.ip || "local";
    } catch {}
    const actor = localStorage.getItem("admin-name") || "Unknown";
    const logs = JSON.parse(localStorage.getItem("audit-logs") || "[]");
    logs.push({
      action,
      actor,
      target,
      timestamp: new Date().toISOString(),
      ip,
      status,
      eventType,
    });
    localStorage.setItem("audit-logs", JSON.stringify(logs));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRole(localStorage.getItem("admin-role") || "");
    }
  }, []);

  // Add Admin handler
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newAdmin.name.trim()) return;
    const adminObj = { id: Date.now(), name: newAdmin.name.trim(), role: newAdmin.role };
    setAdmins([
      ...admins,
      adminObj,
    ]);
    await addAuditLog("created admin", `${adminObj.name} (${adminObj.role})`, "success", "admin");
    setNewAdmin({ name: "", role: "moderator" });
    setShowAddModal(false);
  };

  // Edit Admin handler
  const handleEditAdmin = async (e) => {
    e.preventDefault();
    const oldAdmin = admins.find(a => a.id === editAdminId);
    setAdmins(admins.map(a => a.id === editAdminId ? { ...a, ...editAdmin } : a));
    await addAuditLog(
      "edited admin",
      `${oldAdmin?.name || ""} → ${editAdmin.name} (${editAdmin.role})`,
      "success",
      "admin"
    );
    setEditAdminId(null);
    setEditAdmin({ name: "", role: "moderator" });
  };

  // Delete Admin handler
  const handleDeleteAdmin = async (id) => {
    const admin = admins.find(a => a.id === id);
    setAdmins(admins.filter(a => a.id !== id));
    await addAuditLog("deleted admin", `${admin?.name || ""} (${admin?.role || ""})`, "success", "admin");
    setShowDeleteId(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Management</h1>
      <div className="mb-4 text-gray-600">Your role: <span className="font-semibold text-green-700">{role}</span></div>
      <table className="w-full border mb-6 rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Role</th>
            {role === "superadmin" && <th className="p-3 text-left">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {admins.map((a, i) => (
            <tr key={a.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 font-medium">{a.name}</td>
              <td className="p-3">
                <span className={
                  a.role === "superadmin"
                    ? "bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold"
                    : "bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold"
                }>
                  {a.role.charAt(0).toUpperCase() + a.role.slice(1)}
                </span>
              </td>
              {role === "superadmin" && (
                <td className="p-3 flex gap-2 items-center">
                  <button
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      setEditAdminId(a.id);
                      setEditAdmin({ name: a.name, role: a.role });
                    }}
                  >Edit</button>
                  <button
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => setShowDeleteId(a.id)}
                  >Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>


      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white p-6 rounded shadow w-80" onSubmit={handleAddAdmin}>
            <h2 className="text-lg font-bold mb-4">Add Admin</h2>
            <label className="block mb-2 text-sm">Name
              <input
                className="w-full border rounded px-2 py-1 mt-1"
                value={newAdmin.name}
                onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })}
                required
              />
            </label>
            <label className="block mb-4 text-sm">Role
              <select
                className="w-full border rounded px-2 py-1 mt-1"
                value={newAdmin.role}
                onChange={e => setNewAdmin({ ...newAdmin, role: e.target.value })}
              >
                <option value="moderator">Moderator</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </label>
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Add</button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Admin Modal */}
      {editAdminId && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white p-6 rounded shadow w-80" onSubmit={handleEditAdmin}>
            <h2 className="text-lg font-bold mb-4">Edit Admin</h2>
            <label className="block mb-2 text-sm">Name
              <input
                className="w-full border rounded px-2 py-1 mt-1"
                value={editAdmin.name}
                onChange={e => setEditAdmin({ ...editAdmin, name: e.target.value })}
                required
              />
            </label>
            <label className="block mb-4 text-sm">Role
              <select
                className="w-full border rounded px-2 py-1 mt-1"
                value={editAdmin.role}
                onChange={e => setEditAdmin({ ...editAdmin, role: e.target.value })}
              >
                <option value="moderator">Moderator</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </label>
            <div className="flex gap-2 justify-end">
              <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={() => setEditAdminId(null)}>Cancel</button>
              <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Admin Confirmation */}
      {showDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="text-lg font-bold mb-4">Delete Admin</h2>
            <p>Are you sure you want to delete this admin?</p>
            <div className="flex gap-2 justify-end mt-4">
              <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setShowDeleteId(null)}>Cancel</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => handleDeleteAdmin(showDeleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Only superadmin can add/edit/remove admins (UI only) */}
      {role === "superadmin" && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded flex items-center gap-4">
          <b>Superadmin Controls:</b>
          <button
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => setShowAddModal(true)}
          >Add Admin</button>
          <span className="text-gray-500">(Edit/Delete buttons appear next to each admin)</span>
        </div>
      )}
      {role !== "superadmin" && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          Only superadmins can manage other admins.
        </div>
      )}
    </div>
  );
}
