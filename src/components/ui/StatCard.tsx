import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendDown?: boolean;
}

export function StatCard({ title, value, icon, trend, trendDown }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-500">{icon}</div>
        <div className={`text-sm ${trendDown ? 'text-red-500' : 'text-green-500'}`}>
          {trend}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}