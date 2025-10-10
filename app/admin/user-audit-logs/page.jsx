// ---
// User Audit Logs Page
// This page displays user activities from localStorage key 'user-audit-logs'.
// Admin audit logs are in a separate table at /admin/audit-logs (key: 'audit-logs').
// Both use the same log entry structure and table UI with a slider in the header.
// See README for more details on the unified audit log system.
// ---
"use client";

import { useEffect, useState } from "react";

export default function UserAuditLogsPage() {
  const [userLogs, setUserLogs] = useState([]);
  const [actionFilter, setActionFilter] = useState("");
  const [actorFilter, setActorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sliderValue, setSliderValue] = useState(20);

  // Load logs from localStorage
  const loadLogs = () => {
    if (typeof window !== "undefined") {
      const logs = JSON.parse(localStorage.getItem("user-audit-logs") || "[]");
      setUserLogs(logs);
    }
  };

  useEffect(() => {
    loadLogs();
    // Listen for page focus to refresh logs
    const onFocus = () => loadLogs();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  // Filtering logic
  let filtered = userLogs;
  if (actionFilter) filtered = filtered.filter(l => l.action === actionFilter);
  if (actorFilter) filtered = filtered.filter(l => l.actor === actorFilter);
  if (dateFilter) filtered = filtered.filter(l => l.timestamp.slice(0, 10) === dateFilter);
  if (search) filtered = filtered.filter(l =>
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.actor.toLowerCase().includes(search.toLowerCase()) ||
    l.target.toLowerCase().includes(search.toLowerCase()) ||
    (l.ip || "").includes(search)
  );

  // Unique actions/actors for filter dropdowns
  const actions = Array.from(new Set(userLogs.map(l => l.action)));
  const actors = Array.from(new Set(userLogs.map(l => l.actor)));

  // Export to CSV
  function exportCSV() {
    const headers = ["Time","Action","Actor","Target","IP","Status","EventType"];
    const rows = filtered.map(l => [
      new Date(l.timestamp).toLocaleString(),
      l.action,
      l.actor,
      l.target,
      l.ip || "",
      l.status || "",
      l.eventType || ""
    ]);
    const csv = [headers, ...rows].map(r => r.map(x => `"${(x||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `user-audit-logs-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Audit Logs</h1>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-2">
          <input
            className="border rounded px-2 py-1 text-sm"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ minWidth: 120 }}
          />
          <select className="border rounded px-2 py-1 text-sm" value={actionFilter} onChange={e => setActionFilter(e.target.value)}>
            <option value="">All Actions</option>
            {actions.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select className="border rounded px-2 py-1 text-sm" value={actorFilter} onChange={e => setActorFilter(e.target.value)}>
            <option value="">All Actors</option>
            {actors.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <input
            className="border rounded px-2 py-1 text-sm"
            type="date"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            style={{ minWidth: 120 }}
          />
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm" onClick={exportCSV} type="button">Export CSV</button>
        </div>
        <div className="border rounded bg-gray-50 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Time</th>
                <th className="p-2 text-left">Action</th>
                <th className="p-2 text-left">Actor</th>
                <th className="p-2 text-left">Target</th>
                <th className="p-2 text-left">IP</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Event Type</th>
                <th className="p-2 text-left" style={{ minWidth: 180 }}>
                  <div className="flex items-center gap-2">
                    <label htmlFor="slider" className="text-xs">Rows:</label>
                    <input
                      id="slider"
                      type="range"
                      min={5}
                      max={100}
                      value={sliderValue}
                      onChange={e => setSliderValue(Number(e.target.value))}
                      className="w-24 accent-blue-600"
                    />
                    <span className="text-xs">{sliderValue}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.slice(-sliderValue).reverse().map((log, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-2 capitalize">{log.action}</td>
                  <td className="p-2">{log.actor}</td>
                  <td className="p-2">{log.target}</td>
                  <td className="p-2">{log.ip || ""}</td>
                  <td className="p-2">{log.status || ""}</td>
                  <td className="p-2">{log.eventType || ""}</td>
                  <td className="p-2"></td>
                </tr>
              )) : (
                <tr><td colSpan={8} className="p-2 text-gray-400">No user audit logs found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
