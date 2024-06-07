import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ children, isAuthenticated, isAdmin = false, adminOnly = false }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
