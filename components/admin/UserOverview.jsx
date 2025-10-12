"use client";

import React, { useEffect, useState } from 'react';

const UserOverview = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/user/data/all');
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <div className="my-8 text-center">Loading users...</div>;
  if (error) return <div className="my-8 text-center text-red-600">{error}</div>;

  return (
    <section className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Recent Users</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">Name</th>
            <th className="pb-2">Email</th>
            <th className="pb-2">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 5).map((user) => (
            <tr key={user._id} className="border-t">
              <td className="py-2">{user.name || 'N/A'}</td>
              <td className="py-2">{user.email || 'N/A'}</td>
              <td className="py-2">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserOverview;
