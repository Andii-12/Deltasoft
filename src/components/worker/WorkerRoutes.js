import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WorkerLogin from './Login';
import WorkerDashboard from './Dashboard';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('workerToken');
  return token ? children : <Navigate to="/worker/login" />;
};

const WorkerRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<WorkerLogin />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <WorkerDashboard />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/worker/dashboard" />} />
    </Routes>
  );
};

export default WorkerRoutes; 