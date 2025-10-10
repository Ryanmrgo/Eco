import React, { useEffect, useState } from "react";

const WasteReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch reports from API
  const fetchReports = () => {
    setLoading(true);
    fetch("/api/waste-report")
      .then((res) => res.json())
      .then((data) => {
        setReports(data.reports || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReports();
  }, []);


  // Only show confirmed reports
  const confirmedReports = reports.filter(r => r.confirmed);

  if (loading) return <div>Loading waste reports...</div>;
  if (!confirmedReports.length) return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <button
        onClick={fetchReports}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Refresh
      </button>
      <div>No confirmed waste reports found.</div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Submitted Waste Reports</h2>
        <button
          onClick={fetchReports}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
      <ul className="space-y-6">
        {confirmedReports.map((r) => (
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
