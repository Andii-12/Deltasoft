import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import NewsManagement from './NewsManagement';
import QuotesDashboard from './QuotesDashboard';
import Login from './Login';
import TeamManagement from './TeamManagement';

// Authentication check
const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="news" replace />} />
        <Route path="news" element={<NewsManagement />} />
        <Route path="quotes" element={<QuotesDashboard />} />
        <Route path="team" element={<TeamManagement />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes; 