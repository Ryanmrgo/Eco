"use client";

import React, { useEffect, useState } from 'react';

const RecentWasteReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/waste-report/list');
        const data = await res.json();
        setReports(data.reports || []);
      } catch (err) {
        setError('Failed to load waste reports');
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  if (loading) return <div className="my-8 text-center">Loading waste reports...</div>;
  if (error) return <div className="my-8 text-center text-red-600">{error}</div>;

  return (
    <section className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Recent Waste Reports</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">Location</th>
            <th className="pb-2">Photo</th>
            <th className="pb-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.slice(0, 5).map((report) => (
            <tr key={report._id} className="border-t">
              <td className="py-2">{report.locationName || 'N/A'}</td>
              <td className="py-2">{report.photoUrl ? <img src={report.photoUrl} alt="waste" className="h-8 w-8 object-cover rounded" /> : 'N/A'}</td>
              <td className="py-2">{report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RecentWasteReports;
