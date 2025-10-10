import React from 'react';

const orders = [
  { id: 101, user: 'John Doe', product: 'Macbook', date: '2025-09-09', status: 'Delivered' },
  { id: 102, user: 'Jane Smith', product: 'Headphones', date: '2025-09-08', status: 'Pending' },
  { id: 103, user: 'Alice Brown', product: 'Bracelet', date: '2025-09-07', status: 'Delivered' },
];

const RecentOrders = () => {
  return (
    <section className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Recent Orders</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-2">User</th>
            <th className="pb-2">Product</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="py-2">{order.user}</td>
              <td className="py-2">{order.product}</td>
              <td className="py-2">{order.date}</td>
              <td className="py-2">
                <span className={`px-2 py-1 rounded text-xs ${order.status === 'Delivered' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{order.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RecentOrders;
