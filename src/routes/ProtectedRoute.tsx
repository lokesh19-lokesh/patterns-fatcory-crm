import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PermissionAction } from '../lib/permissions';
import { ShieldAlert } from 'lucide-react';

/**
 * Top-level auth guard: redirects unauthenticated users to /login.
 */
export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Loading Tenant Security Session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

/**
 * Permission-gated wrapper component.
 * Wraps a page component and checks if the current role has the required permission.
 * If not, renders a styled "Access Denied" screen instead of the page.
 */
interface PermissionGateProps {
  permission: PermissionAction;
  children: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({ permission, children }) => {
  const { hasPermission, role } = useAuth();

  if (!hasPermission(permission)) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 mb-2">
            <ShieldAlert className="w-8 h-8 text-rose-400" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">
            Access Restricted
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Your current role <span className="font-bold text-amber-400">"{role}"</span> does not
            have permission to access this module. Contact your Company Admin to request elevated
            access.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-semibold text-slate-400">
            <span className="text-rose-400">Required:</span>
            <code className="text-slate-300">{permission}</code>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
