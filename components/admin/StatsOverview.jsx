import React from 'react';

const stats = [
  { label: 'Total Users', value: 1200 },
  { label: 'Total Products', value: 350 },
  { label: 'Waste Reports', value: 87 },
  { label: 'Orders', value: 210 },
];

const StatsOverview = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
          <p className="text-2xl font-bold text-green-700 mt-2">{stat.value}</p>
        </div>
      ))}
    </section>
  );
};

export default StatsOverview;
