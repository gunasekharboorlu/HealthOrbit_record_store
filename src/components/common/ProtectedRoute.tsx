import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { User } from '../../types';

interface ProtectedRouteProps {
  currentUser: User | null;
  allowedRoles?: ('patient' | 'doctor' | 'admin')[];
  children: React.ReactNode;
}

export default function ProtectedRoute({
  currentUser,
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to their default dashboard
    if (currentUser.role === 'patient') {
      return <Navigate to="/app/patient/dashboard" replace />;
    } else if (currentUser.role === 'doctor') {
      return <Navigate to="/app/doctor/dashboard" replace />;
    } else if (currentUser.role === 'admin') {
      return <Navigate to="/app/admin/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
