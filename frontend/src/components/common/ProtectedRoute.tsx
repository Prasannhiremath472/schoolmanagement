import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface Props { requiredRole?: 'platform' | 'school' | 'any'; }

const PLATFORM_ROLES = ['SUPER_ADMIN', 'ADMIN', 'SUPPORT', 'FINANCE', 'RESELLER'];
const SCHOOL_ROLES  = ['SCHOOL_ADMIN', 'TEACHER', 'STUDENT', 'PARENT', 'STAFF',
                       'ACCOUNTANT', 'LIBRARIAN', 'TRANSPORT_MANAGER', 'HOSTEL_WARDEN'];

export function ProtectedRoute({ requiredRole }: Props) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const role = user?.role as string;

  if (requiredRole === 'platform' && !PLATFORM_ROLES.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requiredRole === 'school' && !SCHOOL_ROLES.includes(role)) {
    return <Navigate to="/super-admin" replace />;
  }

  return <Outlet />;
}
