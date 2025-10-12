import React, { useEffect, useState } from "react";

const AdminWasteReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetch("/api/waste-report")
      .then((res) => res.json())
      .then((data) => {
        setReports(data.reports || []);
        setLoading(false);
      });
  }, []);

  const handleExport = () => {
    window.open("/api/waste-report/export", "_blank");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/waste-report/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReports((prev) => prev.filter((r) => r._id !== id));
        setNotification("Report deleted successfully!");
        setTimeout(() => setNotification(""), 2000);
      } else {
        setNotification("Failed to delete report.");
        setTimeout(() => setNotification(""), 2000);
      }
    } catch (err) {
      setNotification("Error deleting report.");
      setTimeout(() => setNotification(""), 2000);
    }
    setDeleting(null);
  };

  if (loading) return <div>Loading waste reports...</div>;
  if (!reports.length) return <div>No waste reports found.</div>;

  const handleConfirm = async (id) => {
    setConfirming(id);
    try {
      const res = await fetch(`/api/waste-report/${id}`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        setReports((prev) => prev.map(r => r._id === id ? { ...r, confirmed: true } : r));
        setNotification("Report confirmed successfully!");
        setTimeout(() => setNotification(""), 2000);
      } else {
        setNotification("Failed to confirm report.");
        setTimeout(() => setNotification(""), 2000);
      }
    } catch (err) {
      setNotification("Error confirming report.");
      setTimeout(() => setNotification(""), 2000);
    }
    setConfirming(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      {notification && (
  <div className="fixed left-1/2 top-[150px] -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
          {notification}
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin: Waste Reports</h2>
        <button
          onClick={handleExport}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Export as Excel (CSV)
        </button>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Photo</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r._id}>
              <td className="border p-2">
                {r.photoUrl ? (
                  <img src={r.photoUrl} alt="Waste" style={{ width: 64, height: 64 }} className="object-cover rounded" />
                ) : (
                  <div style={{ width: 64, height: 64 }} className="bg-gray-200 flex items-center justify-center rounded text-xs text-gray-500">No Photo</div>
                )}
              </td>
              <td className="border p-2">{r.locationName}</td>
              <td className="border p-2">{new Date(r.createdAt).toLocaleString()}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleConfirm(r._id)}
                  className={`bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 ${r.confirmed ? 'opacity-60 cursor-not-allowed' : ''}`}
                  disabled={!!r.confirmed || confirming === r._id}
                >
                  {r.confirmed ? 'Confirmed' : confirming === r._id ? 'Confirming...' : 'Confirm'}
                </button>
                <button
                  onClick={() => handleDelete(r._id)}
                  className={`bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 ${deleting === r._id ? 'opacity-60 cursor-not-allowed' : ''}`}
                  disabled={deleting === r._id}
                >
                  {deleting === r._id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  {/* Removed unused selected modal code */}
    </div>
  );
};

export default AdminWasteReports;
