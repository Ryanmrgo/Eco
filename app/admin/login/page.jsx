// app/admin/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Helper: get IP address (best effort, fallback to 'local')
  async function getIp() {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip || "local";
    } catch {
      return "local";
    }
  }

  // Helper: log audit event
  async function logAudit(action, status, eventType) {
    const ip = await getIp();
    const logs = JSON.parse(localStorage.getItem("audit-logs") || "[]");
    logs.push({
      action,
      actor: username,
      target: username,
      timestamp: new Date().toISOString(),
      ip,
      status,
      eventType,
    });
    localStorage.setItem("audit-logs", JSON.stringify(logs));
  }

  async function handleLogin(e) {
    e.preventDefault();
    // Simple role logic for demo: admin = superadmin, mod = moderator
    let role = null;
    if (username === "admin" && password === "password123") {
      role = "superadmin";
    } else if (username === "mod" && password === "mod123") {
      role = "moderator";
    }
    if (role) {
      localStorage.setItem("admin-auth", "true");
      localStorage.setItem("admin-role", role);
      localStorage.setItem("admin-name", username);
      await logAudit("login", "success", "auth");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
      await logAudit("login", "fail", "auth");
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-xs mx-auto mt-20 p-6 bg-white rounded shadow flex flex-col items-center">
  <img src="/assets/logo.png" alt="Eco Hive Logo" className="h-23 w-auto mb-0" />
  <div className="text-gray-600 text-sm mb-2 mt-1">Road to Cleaner Environment</div>
  <h1 className="text-xl font-bold mb-4">Admin Login</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <input className="border w-full mb-2 px-2 py-1 rounded" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="border w-full mb-4 px-2 py-1 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full" type="submit">Login</button>
      <div className="text-xs text-gray-400 mt-2 text-center">
        <div>Demo superadmin: <b>admin</b> / <b>password123</b></div>
        <div>Demo moderator: <b>mod</b> / <b>mod123</b></div>
      </div>
    </form>
  );
}