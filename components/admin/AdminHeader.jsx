"use client";
import React, { useEffect, useRef, useState } from 'react';

const AdminHeader = () => {
  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin-notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  // Mark as read
  const markAsRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem("admin-notifications", JSON.stringify(updated));
  };
  // Clear all
  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("admin-notifications", JSON.stringify([]));
  };

  // Logout handler with audit log
  const handleLogout = async () => {
    // Helper: get IP address
    let ip = "local";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      ip = data.ip || "local";
    } catch {}
    const actor = localStorage.getItem("admin-name") || "Unknown";
    const logs = JSON.parse(localStorage.getItem("audit-logs") || "[]");
    logs.push({
      action: "logout",
      actor,
      target: actor,
      timestamp: new Date().toISOString(),
      ip,
      status: "success",
      eventType: "auth",
    });
    localStorage.setItem("audit-logs", JSON.stringify(logs));
    localStorage.removeItem("admin-auth");
    localStorage.removeItem("admin-role");
    localStorage.removeItem("admin-name");
    window.location.href = "/admin/login";
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <div className="text-xl font-bold text-green-700">Eco Hive Admin Panel</div>
      <div className="flex items-center gap-4 relative">
        <span className="text-gray-600">Welcome, Admin</span>
        {/* Notification Bell */}
        <button
          className="relative focus:outline-none"
          onClick={() => setDropdownOpen(v => !v)}
          aria-label="Notifications"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{unreadCount}</span>
          )}
        </button>
        {/* Dropdown */}
        {dropdownOpen && (
          <div ref={dropdownRef} className="absolute right-0 top-10 w-80 bg-white border rounded shadow-lg z-50">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <span className="font-semibold">Notifications</span>
              <button className="text-xs text-red-500 hover:underline" onClick={clearAll}>Clear All</button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 && <div className="p-4 text-gray-400">No notifications.</div>}
              {notifications.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(n => (
                <div key={n.id} className={`px-4 py-3 border-b flex items-start gap-2 ${n.read ? 'bg-gray-50' : 'bg-yellow-50'}`}>
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">{n.message}</div>
                    <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()} &middot; {n.type.charAt(0).toUpperCase() + n.type.slice(1)}</div>
                  </div>
                  {!n.read && (
                    <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600" onClick={() => markAsRead(n.id)}>Mark as Read</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          onClick={handleLogout}
        >Logout</button>
      </div>
    </header>
  );
};

export default AdminHeader;
