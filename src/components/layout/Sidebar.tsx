import React from 'react';
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
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { PermissionAction } from '../../lib/permissions';

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
  const { user, company, companies, selectCompany, role, switchRole, logout, hasPermission } = useAuth();
  const isSuperAdminUser = user?.email?.trim().toLowerCase() === 'brickserpsoftware@gmail.com';

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
        <div className="flex items-center gap-2.5 overflow-hidden">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt="Avatar"
            className="w-8 h-8 rounded-full border border-slate-300 object-cover shrink-0"
          />
          <div className="overflow-hidden text-left">
            <p className="text-xs font-bold text-slate-900 truncate">{user?.full_name}</p>
            <p className="text-[10px] text-slate-500 font-semibold truncate">
              {role === 'Super Admin'
                ? 'Platform Super Admin (Owner)'
                : 'End User (Factory Client)'}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          title="Sign Out"
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
