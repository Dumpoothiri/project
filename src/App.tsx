import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import PaymentPage from './components/payment/PaymentPage';
import PaymentResult from './components/payment/PaymentResult';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/result" element={<PaymentResult />} />
        <Route path="/" element={<Navigate to="/payment" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;