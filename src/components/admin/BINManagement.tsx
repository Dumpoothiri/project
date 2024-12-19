import React, { useState } from 'react';
import { useBINStore } from '../../store/bins';
import { validateBIN } from '../../lib/utils';
import { Plus, Trash2 } from 'lucide-react';

export default function BINManagement() {
  const [newBIN, setNewBIN] = useState('');
  const [error, setError] = useState('');
  const { bins, addBIN, removeBIN } = useBINStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBIN(newBIN)) {
      setError('Please enter a valid 6-digit BIN');
      return;
    }
    addBIN(newBIN);
    setNewBIN('');
    setError('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">BIN Management</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={newBIN}
              onChange={(e) => setNewBIN(e.target.value)}
              placeholder="Enter 6-digit BIN"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={6}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                BIN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Added Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bins.map((bin) => (
              <tr key={bin.id}>
                <td className="px-6 py-4 whitespace-nowrap">{bin.bin}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {bin.createdAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bin.isValid
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {bin.isValid ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => removeBIN(bin.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}