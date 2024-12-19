import React from 'react';
import { Download } from 'lucide-react';
import { Table } from '../ui/Table';
import { useTransactionStore } from '../../store/transactions';
import { formatAmount } from '../../lib/utils';

export default function Transactions() {
  const transactions = useTransactionStore((state) => state.transactions);

  const columns = [
    { key: 'id', header: 'Transaction ID' },
    {
      key: 'date',
      header: 'Date',
      render: (date: Date) => date.toLocaleDateString(),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (amount: number) => formatAmount(amount),
    },
    {
      key: 'last4',
      header: 'Card',
      render: (last4: string) => `**** ${last4}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (status: string) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            status === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status === 'success' ? 'Successful' : 'Failed'}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      <Table columns={columns} data={transactions} />
    </div>
  );
}