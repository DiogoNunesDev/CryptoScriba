import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  adminOnly?: boolean;
  balance?:boolean;
}

const ProtectedRoute: React.FC<Props> = ({ children, isAuthenticated, isAdmin = false, adminOnly = false, balance = false }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  if (isAdmin && balance){
    return <Navigate to="/backrooms" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
