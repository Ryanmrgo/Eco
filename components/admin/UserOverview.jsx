import React from 'react';

const users = [
  { id: 1, name: 'John Doe', role: 'Seller', joined: '2025-08-01' },
  { id: 2, name: 'Jane Smith', role: 'Buyer', joined: '2025-07-15' },
  { id: 3, name: 'Alice Brown', role: 'Seller', joined: '2025-06-20' },
];

const UserOverview = () => {
  return (
    <section className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Recent Users</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">Name</th>
            <th className="pb-2">Role</th>
            <th className="pb-2">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">{user.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserOverview;
