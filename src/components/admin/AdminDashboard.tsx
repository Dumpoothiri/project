import React from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import {
  LayoutDashboard,
  CreditCard,
  List,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';
import Dashboard from './Dashboard';
import BINManagement from './BINManagement';
import Transactions from './Transactions';
import SettingsPanel from './Settings';

export default function AdminDashboard() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800">Payment Gateway</h1>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin/dashboard"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/admin/bins"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <CreditCard className="w-5 h-5 mr-3" />
            BIN Management
          </Link>
          <Link
            to="/admin/transactions"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <List className="w-5 h-5 mr-3" />
            Transactions
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <SettingsIcon className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-red-600"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bins" element={<BINManagement />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<SettingsPanel />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}