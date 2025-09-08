import React, { useEffect, useState } from "react";

const AdminWasteReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const res = await fetch(`/api/waste-report/${id}`, { method: "DELETE" });
    if (res.ok) {
      setReports((prev) => prev.filter((r) => r._id !== id));
    }
  };

  if (loading) return <div>Loading waste reports...</div>;
  if (!reports.length) return <div>No waste reports found.</div>;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
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
                {r.photoUrl && (
                  <img src={r.photoUrl} alt="Waste" className="w-16 h-16 object-cover rounded" />
                )}
              </td>
              <td className="border p-2">{r.locationName}</td>
              <td className="border p-2">{new Date(r.createdAt).toLocaleString()}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(r._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminWasteReports;
