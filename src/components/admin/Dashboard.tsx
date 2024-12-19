import React from 'react';
import { BarChart, DollarSign, CreditCard, AlertTriangle } from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { useTransactionStore } from '../../store/transactions';

export default function Dashboard() {
  const transactions = useTransactionStore((state) => state.transactions);
  
  const stats = {
    total: transactions.length,
    successful: transactions.filter((t) => t.status === 'success').length,
    failed: transactions.filter((t) => t.status === 'failed').length,
    revenue: transactions
      .filter((t) => t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Transactions"
          value={stats.total.toString()}
          icon={<BarChart className="w-6 h-6" />}
          trend="+12.5%"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue.toFixed(2)}`}
          icon={<DollarSign className="w-6 h-6" />}
          trend="+8.2%"
        />
        <StatCard
          title="Successful Payments"
          value={stats.successful.toString()}
          icon={<CreditCard className="w-6 h-6" />}
          trend="+15.3%"
        />
        <StatCard
          title="Failed Payments"
          value={stats.failed.toString()}
          icon={<AlertTriangle className="w-6 h-6" />}
          trend="-2.4%"
          trendDown
        />
      </div>
    </div>
  );
}