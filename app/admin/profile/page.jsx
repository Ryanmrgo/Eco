"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function AdminProfilePage() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setName(localStorage.getItem("admin-name") || "");
      setRole(localStorage.getItem("admin-role") || "");
      setEmail(localStorage.getItem("admin-email") || "");
    }
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    localStorage.setItem("admin-name", name);
    localStorage.setItem("admin-email", email);
    // Audit log
    let ip = "local";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      ip = data.ip || "local";
    } catch {}
    const logs = JSON.parse(localStorage.getItem("audit-logs") || "[]");
    logs.push({
      action: "updated profile",
      actor: name,
      target: name,
      timestamp: new Date().toISOString(),
      ip,
      status: "success",
      eventType: "profile",
    });
    localStorage.setItem("audit-logs", JSON.stringify(logs));
    setSuccess("Profile updated successfully.");
    setTimeout(() => setSuccess(""), 2000);
  };

  // Demo: store password in localStorage (not secure, for demo only)
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwError("");
    if (!oldPw || !newPw || !confirmPw) {
      setPwError("All fields are required.");
      return;
    }
    if (newPw !== confirmPw) {
      setPwError("New passwords do not match.");
      return;
    }
    // Demo: get current password from localStorage (simulate per user)
    const storedPw = localStorage.getItem(`pw-${name}`) || (name === "admin" ? "password123" : name === "mod" ? "mod123" : "");
    if (oldPw !== storedPw) {
      setPwError("Old password is incorrect.");
      // Audit log fail
      let ip = "local";
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        ip = data.ip || "local";
      } catch {}
      const logs = JSON.parse(localStorage.getItem("audit-logs") || "[]");
      logs.push({
        action: "change password",
        actor: name,
        target: name,
        timestamp: new Date().toISOString(),
        ip,
        status: "fail",
        eventType: "profile",
      });
      localStorage.setItem("audit-logs", JSON.stringify(logs));
      return;
    }
    // Save new password
    localStorage.setItem(`pw-${name}`, newPw);
    // Audit log success
    let ip = "local";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      ip = data.ip || "local";
    } catch {}
    const logs = JSON.parse(localStorage.getItem("audit-logs") || "[]");
    logs.push({
      action: "change password",
      actor: name,
      target: name,
      timestamp: new Date().toISOString(),
      ip,
      status: "success",
      eventType: "profile",
    });
    localStorage.setItem("audit-logs", JSON.stringify(logs));
    setPwSuccess("Password changed successfully.");
    setOldPw(""); setNewPw(""); setConfirmPw("");
    setTimeout(() => setPwSuccess(""), 2000);
  };

  return (
    <div className="p-8">
      <button
        className="mb-4 px-3 py-1 bg-green-600 hover:bg-green-600 rounded text-sm flex items-center text-white"
        onClick={() => router.push("/admin/dashboard")}
        type="button"
        aria-label="Back to Dashboard"
      >
        <span className="mr-2">&#8592;</span> Back to Dashboard
      </button>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
        <form onSubmit={handleProfileUpdate} className="bg-white p-6 rounded shadow mb-6">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input className="border rounded px-3 py-2 w-full" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input className="border rounded px-3 py-2 w-full" value={email} onChange={e => setEmail(e.target.value)} type="email" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Role</label>
          <input className="border rounded px-3 py-2 w-full bg-gray-100" value={role} disabled />
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Update Profile</button>
        {success && <div className="text-green-600 mt-2">{success}</div>}
      </form>

        <form onSubmit={handleChangePassword} className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Change Password</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Old Password</label>
            <input className="border rounded px-3 py-2 w-full" type="password" value={oldPw} onChange={e => setOldPw(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">New Password</label>
            <input className="border rounded px-3 py-2 w-full" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Confirm New Password</label>
            <input className="border rounded px-3 py-2 w-full" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} required />
          </div>
          {pwError && <div className="text-red-600 mb-2">{pwError}</div>}
          {pwSuccess && <div className="text-green-600 mb-2">{pwSuccess}</div>}
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
}
