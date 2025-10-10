"use client";
import { useEffect, useState } from "react";

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: "report",
    message: "New waste report submitted by user John Doe.",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
  },
  {
    id: 2,
    type: "order",
    message: "Order #12345 placed by Jane Smith.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
  {
    id: 3,
    type: "approval",
    message: "Product 'Eco Cup' approved by moderator.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: true,
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load from localStorage or use mock
    const stored = localStorage.getItem("admin-notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      setNotifications(mockNotifications);
      localStorage.setItem("admin-notifications", JSON.stringify(mockNotifications));
    }
  }, []);

  // Mark as read
  const markAsRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem("admin-notifications", JSON.stringify(updated));
    // Optionally log to audit log
  };

  // Clear all
  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("admin-notifications", JSON.stringify([]));
    // Optionally log to audit log
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications & Alerts</h1>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">You have {notifications.filter(n => !n.read).length} unread notification(s).</span>
        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm" onClick={clearAll}>Clear All</button>
      </div>
      <div className="space-y-3">
        {notifications.length === 0 && <div className="text-gray-400">No notifications.</div>}
        {notifications.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(n => (
          <div key={n.id} className={`p-4 rounded shadow flex items-center justify-between ${n.read ? 'bg-gray-100' : 'bg-yellow-50 border-l-4 border-yellow-400'}`}>
            <div>
              <div className="font-medium mb-1">{n.message}</div>
              <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()} &middot; {n.type.charAt(0).toUpperCase() + n.type.slice(1)}</div>
            </div>
            {!n.read && (
              <button className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs" onClick={() => markAsRead(n.id)}>Mark as Read</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
