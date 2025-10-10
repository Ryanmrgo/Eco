import React from 'react';

const reports = [
  { id: 1, user: 'John Doe', type: 'Plastic', date: '2025-09-09', status: 'Resolved' },
  { id: 2, user: 'Jane Smith', type: 'Electronics', date: '2025-09-08', status: 'Pending' },
  { id: 3, user: 'Alice Brown', type: 'Organic', date: '2025-09-07', status: 'Resolved' },
];

const RecentWasteReports = () => {
  return (
    <section className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Recent Waste Reports</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">User</th>
            <th className="pb-2">Type</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-t">
              <td className="py-2">{report.user}</td>
              <td className="py-2">{report.type}</td>
              <td className="py-2">{report.date}</td>
              <td className="py-2">
                <span className={`px-2 py-1 rounded text-xs ${report.status === 'Resolved' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{report.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RecentWasteReports;
