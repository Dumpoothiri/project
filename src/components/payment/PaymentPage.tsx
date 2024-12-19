import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CreditCard } from 'lucide-react';
import { useBINStore } from '../../store/bins';
import { formatCardNumber } from '../../lib/utils';

export default function PaymentPage() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const checkBIN = useBINStore((state) => state.checkBIN);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = checkBIN(cardNumber.replace(/\s/g, ''));
    navigate('/payment/result', { 
      state: { 
        success: isValid,
        amount: 12.99,
        last4: cardNumber.slice(-4)
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Payment Details</h1>
          <Lock className="text-green-600" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                required
              />
              <CreditCard className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </div>
            <div className="w-24">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                CVV
              </label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123"
                maxLength={3}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Pay
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
          <Lock className="w-4 h-4 mr-2" />
          Secured by payu Payment Gateway
        </div>
      </div>
    </div>
  );
}