import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { formatAmount } from '../../lib/utils';

export default function PaymentResult() {
  const location = useLocation();
  const { success, amount, last4 } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        {success ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-500 mb-4">
              Payment Successful!
            </h1>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              Payment Failed
            </h1>
          </>
        )}

        <div className="mb-6">
          <p className="text-gray-600">
            {success
              ? `Your payment of ${formatAmount(amount)} has been processed successfully.`
              : 'Your payment could not be processed. Please try again.'}
          </p>
          {success && (
            <p className="text-sm text-gray-500 mt-2">
              Card ending in {last4}
            </p>
          )}
        </div>

        <Link
          to="/payment"
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {success ? 'Make Another Payment' : 'Try Again'}
        </Link>
      </div>
    </div>
  );
}