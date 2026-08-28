import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  Truck,
  Package,
  Boxes,
  ShoppingCart,
  FileText,
  Receipt,
  Calculator,
  HardHat,
  MapPin,
  UserCheck,
  DollarSign,
  TrendingUp,
  BarChart3,
  FolderLock,
  Settings,
  ShieldCheck,
  LogOut,
  Layers,
  LucideIcon,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';
import { PermissionAction } from '../../lib/permissions';

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  requiredPermission: PermissionAction;
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
  const { user, company, role, switchRole, logout, hasPermission } = useAuth();

  const navGroups: NavGroup[] = [
    {
      title: 'CORE OPERATIONAL HQ',
      items: [
        { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard, requiredPermission: 'view_dashboard' },
        { name: 'Company & Branches', path: '/app/company', icon: Building2, requiredPermission: 'manage_company' },
        { name: 'CRM & Lead Pipeline', path: '/app/crm', icon: TrendingUp, requiredPermission: 'view_crm' },
      ],
    },
    {
      title: 'PARTNERS & MATERIAL MASTER',
      items: [
        { name: 'Customers & Credit', path: '/app/customers', icon: Users, requiredPermission: 'view_customers' },
        { name: 'Suppliers & Vendors', path: '/app/suppliers', icon: Truck, requiredPermission: 'view_suppliers' },
        { name: 'Products & HSN Tax', path: '/app/products', icon: Package, requiredPermission: 'view_products' },
        { name: 'Multi-Warehouse Inventory', path: '/app/inventory', icon: Boxes, requiredPermission: 'view_inventory' },
      ],
    },
    {
      title: 'COMMERCIAL & LOGISTICS',
      items: [
        { name: 'Procurement (PO/GRN)', path: '/app/purchase', icon: ShoppingCart, requiredPermission: 'view_purchase' },
        { name: 'Sales & Quotations', path: '/app/sales', icon: FileText, requiredPermission: 'view_sales' },
        { name: 'GST Billing Engine', path: '/app/billing', icon: Receipt, requiredPermission: 'view_billing' },
        { name: 'Delivery Dispatch & GPS', path: '/app/delivery', icon: MapPin, requiredPermission: 'view_delivery' },
      ],
    },
    {
      title: 'PROJECTS & WORKFORCE',
      items: [
        { name: 'Project & BOQ Manager', path: '/app/projects', icon: HardHat, requiredPermission: 'view_projects' },
        { name: 'Employees & HR', path: '/app/employees', icon: UserCheck, requiredPermission: 'view_employees' },
        { name: 'Geofenced Attendance', path: '/app/attendance', icon: ShieldCheck, requiredPermission: 'view_attendance' },
        { name: 'Payroll & Statutory Tax', path: '/app/payroll', icon: DollarSign, requiredPermission: 'view_payroll' },
      ],
    },
    {
      title: 'FINANCE & GOVERNANCE',
      items: [
        { name: 'Accounting & Ledger', path: '/app/accounting', icon: Calculator, requiredPermission: 'view_accounting' },
        { name: 'Reports & Analytics', path: '/app/reports', icon: BarChart3, requiredPermission: 'view_reports' },
        { name: 'Document Vault', path: '/app/documents', icon: FolderLock, requiredPermission: 'view_documents' },
        { name: 'Settings & Audit Logs', path: '/app/settings', icon: Settings, requiredPermission: 'view_settings' },
      ],
    },
  ];

  const allRoles: UserRole[] = [
    'Super Admin',
    'Company Admin',
    'Manager',
    'Sales Executive',
    'Purchase Manager',
    'Warehouse Manager',
    'HR',
    'Accountant',
    'Driver',
    'Customer',
    'Supplier',
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
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-slate-950 border-r border-slate-800/80 transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Brand Logo & Company Title */}
      <div className="py-4 border-b border-slate-800/80 flex flex-col items-center justify-center bg-slate-900/60 gap-2">
        <img src="/assets/logo.png" alt="Patterns Factory OS" className="h-10 w-auto object-contain shrink-0" />
        <p className="text-[10px] font-semibold text-sky-400 truncate uppercase tracking-wider text-center px-2">
          {company?.name || 'Apex Aggregates'}
        </p>
      </div>

      {/* Role Selector Simulator for Demo */}
      <div className="px-3 py-2 bg-slate-900/90 border-b border-slate-800">
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
          <Layers className="w-3 h-3 text-amber-400" /> Active Role Simulation
        </label>
        <select
          value={role}
          onChange={(e) => switchRole(e.target.value as UserRole)}
          className="w-full bg-slate-950 border border-slate-700/80 text-xs font-semibold text-slate-200 rounded px-2 py-1 focus:outline-none focus:border-sky-500"
        >
          {allRoles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Items — Permission Gated */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
        {visibleGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            <h2 className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
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
                          ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
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
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt="Avatar"
            className="w-8 h-8 rounded-full border border-sky-500/40 object-cover shrink-0"
          />
          <div className="overflow-hidden text-left">
            <p className="text-xs font-bold text-slate-200 truncate">{user?.full_name}</p>
            <p className="text-[10px] text-slate-400 truncate">{role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          title="Sign Out"
          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
