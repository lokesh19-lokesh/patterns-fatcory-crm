import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Boxes,
  HardHat,
  Truck,
  IndianRupee,
  BarChart3,
  Building2,
  Users,
  Package,
  ShoppingCart,
  FileText,
  UserCheck,
  ShieldCheck,
  FolderLock,
  Settings,
  LogOut,
  Sliders,
  TrendingUp,
  LucideIcon,
  Crown,
  Sparkles,
  KeyRound,
  ShieldAlert,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { PermissionAction } from '../../lib/permissions';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  requiredPermission: PermissionAction;
  highlight?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { user, company, companies, selectCompany, role, switchRole, logout, deleteCurrentProfile, hasPermission } = useAuth();
  const isSuperAdminUser = user?.email?.trim().toLowerCase() === 'brickserpsoftware@gmail.com';

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isDeletingProfile, setIsDeletingProfile] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const navGroups: NavGroup[] = [
    ...(isSuperAdminUser
      ? [
          {
            title: 'PLATFORM OWNER CONTROL',
            items: [
              {
                name: 'Tenants & Subscriptions',
                path: '/app/super-admin',
                icon: Crown,
                requiredPermission: 'manage_subscriptions' as PermissionAction,
                highlight: true,
              },
            ],
          },
        ]
      : []),
    {
      title: 'EXECUTIVE COMMAND',
      items: [
        { name: 'Dashboard Overview', path: '/app/dashboard', icon: LayoutDashboard, requiredPermission: 'view_dashboard' },
      ],
    },
    {
      title: '6 CORE FACTORY SERVICES (BRICKOS)',
      items: [
        { name: 'Production Management', path: '/app/production', icon: Layers, requiredPermission: 'view_production', highlight: true },
        { name: 'Stock & Raw Materials', path: '/app/inventory', icon: Boxes, requiredPermission: 'view_inventory', highlight: true },
        { name: 'Labour & Wages', path: '/app/labour-wages', icon: HardHat, requiredPermission: 'view_labour_wages', highlight: true },
        { name: 'Dispatch & Vehicles', path: '/app/delivery', icon: Truck, requiredPermission: 'view_delivery', highlight: true },
        { name: 'Payments & Outstanding', path: '/app/billing', icon: IndianRupee, requiredPermission: 'view_billing', highlight: true },
        { name: 'Reports & Insights', path: '/app/reports', icon: BarChart3, requiredPermission: 'view_reports', highlight: true },
      ],
    },
    {
      title: 'COMMERCIAL & PARTNERS',
      items: [
        { name: 'Customers & Credit', path: '/app/customers', icon: Users, requiredPermission: 'view_customers' },
        { name: 'Suppliers & Vendors', path: '/app/suppliers', icon: Truck, requiredPermission: 'view_suppliers' },
        { name: 'Products & Price Master', path: '/app/products', icon: Package, requiredPermission: 'view_products' },
        { name: 'Procurement (PO/GRN)', path: '/app/purchase', icon: ShoppingCart, requiredPermission: 'view_purchase' },
        { name: 'Sales & Quotations', path: '/app/sales', icon: FileText, requiredPermission: 'view_sales' },
        { name: 'CRM & Lead Pipeline', path: '/app/crm', icon: TrendingUp, requiredPermission: 'view_crm' },
      ],
    },
    {
      title: 'ENTERPRISE & WORKFORCE',
      items: [
        { name: 'Company & Workers', path: '/app/company', icon: Building2, requiredPermission: 'manage_company' },
        { name: 'Staff & HR Records', path: '/app/employees', icon: UserCheck, requiredPermission: 'view_employees' },
        { name: 'Geofenced Attendance', path: '/app/attendance', icon: ShieldCheck, requiredPermission: 'view_attendance' },
        { name: 'Document Vault', path: '/app/documents', icon: FolderLock, requiredPermission: 'view_documents' },
        { name: 'Settings & Audit Logs', path: '/app/settings', icon: Settings, requiredPermission: 'view_settings' },
      ],
    },
  ];

  // Filter groups: only show groups that have at least one visible item
  const visibleGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => hasPermission(item.requiredPermission)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col shadow-xs ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Brand Logo & Company Title */}
      <div className="p-4 border-b border-slate-200 flex flex-col items-center justify-center bg-white gap-1.5">
        <div className="flex items-center gap-2.5">
          <svg width="34" height="25" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path
              d="M34.5 28H10C5.58172 28 2 24.4183 2 20C2 15.9329 5.03457 12.5746 8.97495 12.0628C10.4282 6.32626 15.6517 2 21.8571 2C28.7844 2 34.524 7.21319 35.3211 13.9317C39.6384 14.8052 42.8571 18.636 42.8571 23.2C42.8571 28.0601 38.9172 32 34.0571 32"
              stroke="#D8232A"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-950 font-heading leading-tight">
              Patterns
            </span>
            <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase -mt-0.5">
              ERP Cloud Software
            </span>
          </div>
        </div>

        {isSuperAdminUser ? (
          <p className="text-[10px] font-black text-white truncate uppercase tracking-wider text-center px-2 bg-slate-900 py-0.5 rounded-md w-full border border-slate-800 flex items-center justify-center gap-1">
            <Crown className="w-3 h-3 text-amber-400" /> Platform Super Admin (Us)
          </p>
        ) : (
          <p className="text-[10px] font-bold text-[#D8232A] truncate uppercase tracking-wider text-center px-2 bg-red-50 py-0.5 rounded-md w-full border border-red-100 flex items-center justify-center gap-1">
            <Building2 className="w-3 h-3 text-[#D8232A]" /> {company?.name || 'Factory Client'}
          </p>
        )}
      </div>

      {/* Dynamic Company / Tenant Inspector for Super Admin or Company Card for End User */}
      {isSuperAdminUser ? (
        <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 space-y-1">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Building2 className="w-3 h-3 text-[#D8232A]" /> Inspect Tenant:
            </span>
            <span className="text-[9px] text-[#D8232A] font-extrabold">{company?.name ? company.name.split(' ')[0] : 'All'}</span>
          </label>
          <select
            value={company?.id || ''}
            onChange={(e) => {
              selectCompany(e.target.value);
            }}
            className="w-full bg-white border border-slate-300 text-xs font-semibold text-slate-800 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#D8232A] focus:ring-1 focus:ring-[#D8232A]"
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                🏢 {c.name} ({c.address?.city || 'Factory'})
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="p-2.5 bg-red-50/50 border-b border-slate-200 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white border border-red-100 flex items-center justify-center text-[#D8232A] font-bold text-xs shrink-0 shadow-xs">
            {company?.name?.charAt(0) || 'F'}
          </div>
          <div className="overflow-hidden text-left">
            <p className="text-xs font-bold text-slate-900 truncate leading-tight">{company?.name || 'Factory Workspace'}</p>
            <p className="text-[10px] text-slate-500 font-medium truncate">{company?.address?.city || 'HQ'}, {company?.address?.state || 'India'}</p>
          </div>
        </div>
      )}

      {/* Navigation Items — Permission Gated */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
        {visibleGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            <h2 className="px-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
              {group.title}
            </h2>
            <div className="space-y-0.5 mt-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                        isActive
                          ? 'bg-[#D8232A] text-white shadow-md shadow-[#D8232A]/20 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsProfileModalOpen(true)}
          className="flex items-center gap-2.5 overflow-hidden text-left p-1 rounded-xl hover:bg-slate-200/60 transition-all flex-1 mr-1"
          title="View Account Details & Profile Settings"
        >
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt="Avatar"
            className="w-8 h-8 rounded-full border border-slate-300 object-cover shrink-0"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-900 truncate">{user?.full_name}</p>
            <p className="text-[10px] text-slate-500 font-semibold truncate">
              {role === 'Super Admin'
                ? 'Platform Super Admin (Owner)'
                : `${user?.role || 'End User'} (Factory)`}
            </p>
          </div>
        </button>
        <button
          onClick={logout}
          title="Sign Out"
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Account & Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setIsConfirmDeleteOpen(false);
          setDeleteError('');
        }}
        title="My Account & Profile Settings"
      >
        <div className="space-y-4">
          {/* User Header Summary */}
          <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt="Avatar"
              className="w-12 h-12 rounded-2xl border border-slate-200 object-cover"
            />
            <div className="space-y-0.5">
              <h4 className="text-sm font-black text-slate-900 leading-tight">{user?.full_name}</h4>
              <p className="text-xs text-slate-500 font-medium">{user?.email}</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  role === 'Super Admin'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-200 text-slate-800'
                }`}>
                  {user?.role || role}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active Profile
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details List */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Department</span>
              <span className="font-semibold text-slate-800">{user?.department || 'Operations'}</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Designation</span>
              <span className="font-semibold text-slate-800">{user?.designation || user?.role || 'Plant User'}</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Phone</span>
              <span className="font-semibold text-slate-800">{user?.phone || 'Not provided'}</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Company</span>
              <span className="font-semibold text-slate-800 truncate block">{company?.name || 'Patterns Enterprise'}</span>
            </div>
          </div>

          {deleteError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{deleteError}</span>
            </div>
          )}

          {/* DANGER ZONE / PROFILE DELETION */}
          {role === 'Super Admin' || user?.email?.toLowerCase() === 'brickserpsoftware@gmail.com' ? (
            /* Super Admin Protection Banner (NO DELETE OPTION) */
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-amber-900">Platform Super Admin Root Account</p>
                <p className="text-amber-700/90 text-[11px] mt-0.5">
                  This is the permanent platform administrator account. Deletion is disabled by system policy to preserve database governance.
                </p>
              </div>
            </div>
          ) : (
            /* End-User Profile Deletion Option */
            <div className="pt-2 border-t border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Danger Zone: Delete Account Profile</span>
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Permanently delete your profile and remove your account from this workspace.
                  </p>
                </div>
                {!isConfirmDeleteOpen && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold shrink-0"
                    onClick={() => setIsConfirmDeleteOpen(true)}
                  >
                    Delete Profile
                  </Button>
                )}
              </div>

              {isConfirmDeleteOpen && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl space-y-2.5 animate-in fade-in duration-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-rose-800 font-medium">
                      Are you sure you want to delete your profile? You will be signed out immediately and this action cannot be undone.
                    </p>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setIsConfirmDeleteOpen(false)}
                      disabled={isDeletingProfile}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
                      isLoading={isDeletingProfile}
                      onClick={async () => {
                        setIsDeletingProfile(true);
                        setDeleteError('');
                        try {
                          await deleteCurrentProfile();
                          setIsProfileModalOpen(false);
                        } catch (err: any) {
                          setDeleteError(err.message || 'Failed to delete profile.');
                          setIsDeletingProfile(false);
                        }
                      }}
                    >
                      Yes, Delete My Profile
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </aside>
  );
};
