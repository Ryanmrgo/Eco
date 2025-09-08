import React, { useEffect, useState } from "react";

const WasteReportList = () => {
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

  if (loading) return <div>Loading waste reports...</div>;
  if (!reports.length) return <div>No waste reports found.</div>;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Submitted Waste Reports</h2>
      <ul className="space-y-6">
        {reports.map((r) => (
          <li key={r._id || r.id} className="border rounded-lg p-4 flex gap-4 items-center bg-white shadow">
            {r.photoUrl && (
              <img src={r.photoUrl} alt="Waste" className="w-24 h-24 object-cover rounded" />
            )}
            <div>
              <div className="font-semibold">{r.locationName}</div>
              <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WasteReportList;
