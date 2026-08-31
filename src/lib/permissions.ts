import { UserRole, UserProfile } from '../types';

export type PermissionAction =
  | 'view_super_admin'
  | 'manage_subscriptions'
  | 'view_dashboard'
  | 'view_production'
  | 'manage_production'
  | 'view_labour_wages'
  | 'manage_labour_wages'
  | 'manage_company'
  | 'manage_users'
  | 'view_customers'
  | 'manage_customers'
  | 'view_suppliers'
  | 'manage_suppliers'
  | 'view_products'
  | 'manage_products'
  | 'view_inventory'
  | 'manage_inventory'
  | 'view_purchase'
  | 'manage_purchase'
  | 'view_sales'
  | 'manage_sales'
  | 'view_billing'
  | 'manage_billing'
  | 'view_accounting'
  | 'manage_accounting'
  | 'view_projects'
  | 'manage_projects'
  | 'view_delivery'
  | 'manage_delivery'
  | 'view_employees'
  | 'manage_employees'
  | 'view_attendance'
  | 'manage_attendance'
  | 'view_payroll'
  | 'manage_payroll'
  | 'view_crm'
  | 'manage_crm'
  | 'view_reports'
  | 'view_documents'
  | 'manage_documents'
  | 'view_settings';

export interface ModulePermissionOption {
  action: PermissionAction;
  name: string;
  category: 'Core Operations' | 'Inventory & Logistics' | 'Commercial & Finance' | 'HR & Workforce';
  description: string;
}

export const AVAILABLE_WORKER_PERMISSIONS: ModulePermissionOption[] = [
  { action: 'view_dashboard', name: 'Dashboard Overview', category: 'Core Operations', description: 'View company KPI summary and plant statistics' },
  { action: 'view_production', name: 'Production Management', category: 'Core Operations', description: 'Access batches, machinery status and output records' },
  { action: 'manage_production', name: 'Update Production & Batches', category: 'Core Operations', description: 'Create and log production runs and machinery downtime' },
  { action: 'view_labour_wages', name: 'Labour & Wages', category: 'Core Operations', description: 'View worker piece-rate wages and daily payouts' },
  { action: 'manage_labour_wages', name: 'Manage Labour Payouts', category: 'Core Operations', description: 'Record daily labour attendance and approve piece-rate wages' },
  { action: 'view_inventory', name: 'Stock & Raw Materials', category: 'Inventory & Logistics', description: 'Monitor inventory levels, raw material balance' },
  { action: 'manage_inventory', name: 'Stock In/Out Transactions', category: 'Inventory & Logistics', description: 'Issue stock, record transfers and adjustments' },
  { action: 'view_delivery', name: 'Dispatch & Fleet Logistics', category: 'Inventory & Logistics', description: 'View vehicle dispatch, delivery challans & GPS tracking' },
  { action: 'manage_delivery', name: 'Create Delivery Challans', category: 'Inventory & Logistics', description: 'Dispatch trucks, assign drivers and verify gate passes' },
  { action: 'view_sales', name: 'Sales & Quotations', category: 'Commercial & Finance', description: 'View customer orders and price quotations' },
  { action: 'manage_sales', name: 'Create Orders & Quotations', category: 'Commercial & Finance', description: 'Generate sales orders and approve price quotes' },
  { action: 'view_customers', name: 'Customers & Credit', category: 'Commercial & Finance', description: 'Access client directory and credit balances' },
  { action: 'manage_customers', name: 'Add/Edit Customers', category: 'Commercial & Finance', description: 'Create new contractor/developer accounts' },
  { action: 'view_purchase', name: 'Procurement (PO/GRN)', category: 'Commercial & Finance', description: 'View vendor purchase orders and goods receipt' },
  { action: 'manage_purchase', name: 'Issue Purchase Orders', category: 'Commercial & Finance', description: 'Create POs for raw materials and approve GRNs' },
  { action: 'view_suppliers', name: 'Suppliers & Vendors', category: 'Commercial & Finance', description: 'View raw material vendor directory' },
  { action: 'view_billing', name: 'GST Invoices & Payments', category: 'Commercial & Finance', description: 'View invoices, outstanding collections and receipts' },
  { action: 'manage_billing', name: 'Generate Tax Invoices', category: 'Commercial & Finance', description: 'Issue e-Invoices, payment links and collection receipts' },
  { action: 'view_crm', name: 'CRM & Lead Pipeline', category: 'Commercial & Finance', description: 'Follow up on buyer inquiries and sales opportunities' },
  { action: 'view_reports', name: 'Reports & Analytics', category: 'Commercial & Finance', description: 'View production and financial analytics reports' },
  { action: 'view_employees', name: 'Staff Directory', category: 'HR & Workforce', description: 'View factory staff contact details' },
  { action: 'view_attendance', name: 'Geofenced Attendance', category: 'HR & Workforce', description: 'Clock-in / Clock-out and view shift records' },
  { action: 'manage_attendance', name: 'Approve Attendance Records', category: 'HR & Workforce', description: 'Verify GPS clock-ins and resolve attendance discrepancies' },
  { action: 'view_documents', name: 'Document Vault', category: 'Core Operations', description: 'Access plant compliance, licenses & drawings' },
];

export const ROLE_PERMISSIONS: Record<UserRole, PermissionAction[]> = {
  'Super Admin': [
    'view_super_admin', 'manage_subscriptions',
    'view_dashboard', 'view_production', 'manage_production', 'view_labour_wages', 'manage_labour_wages',
    'manage_company', 'manage_users', 'view_customers', 'manage_customers',
    'view_suppliers', 'manage_suppliers', 'view_products', 'manage_products', 'view_inventory',
    'manage_inventory', 'view_purchase', 'manage_purchase', 'view_sales', 'manage_sales',
    'view_billing', 'manage_billing', 'view_accounting', 'manage_accounting', 'view_projects',
    'manage_projects', 'view_delivery', 'manage_delivery', 'view_employees', 'manage_employees',
    'view_attendance', 'manage_attendance', 'view_payroll', 'manage_payroll', 'view_crm',
    'manage_crm', 'view_reports', 'view_documents', 'manage_documents', 'view_settings'
  ],

  'Admin': [
    'view_dashboard', 'view_production', 'manage_production', 'view_labour_wages', 'manage_labour_wages',
    'manage_company', 'manage_users', 'view_customers', 'manage_customers',
    'view_suppliers', 'manage_suppliers', 'view_products', 'manage_products', 'view_inventory',
    'manage_inventory', 'view_purchase', 'manage_purchase', 'view_sales', 'manage_sales',
    'view_billing', 'manage_billing', 'view_accounting', 'manage_accounting', 'view_projects',
    'manage_projects', 'view_delivery', 'manage_delivery', 'view_employees', 'manage_employees',
    'view_attendance', 'manage_attendance', 'view_payroll', 'manage_payroll', 'view_crm',
    'manage_crm', 'view_reports', 'view_documents', 'manage_documents', 'view_settings'
  ],

  'Company Admin': [
    'view_dashboard', 'view_production', 'manage_production', 'view_labour_wages', 'manage_labour_wages',
    'manage_company', 'manage_users', 'view_customers', 'manage_customers',
    'view_suppliers', 'manage_suppliers', 'view_products', 'manage_products', 'view_inventory',
    'manage_inventory', 'view_purchase', 'manage_purchase', 'view_sales', 'manage_sales',
    'view_billing', 'manage_billing', 'view_accounting', 'manage_accounting', 'view_projects',
    'manage_projects', 'view_delivery', 'manage_delivery', 'view_employees', 'manage_employees',
    'view_attendance', 'manage_attendance', 'view_payroll', 'manage_payroll', 'view_crm',
    'manage_crm', 'view_reports', 'view_documents', 'manage_documents', 'view_settings'
  ],

  'Worker': [
    'view_dashboard', 'view_production', 'manage_production', 'view_inventory', 'view_delivery', 'view_attendance'
  ],

  'Manager': [
    'view_dashboard', 'view_production', 'manage_production', 'view_labour_wages', 'manage_labour_wages',
    'view_customers', 'manage_customers', 'view_suppliers', 'view_products',
    'manage_products', 'view_inventory', 'manage_inventory', 'view_purchase', 'manage_purchase',
    'view_sales', 'manage_sales', 'view_billing', 'view_projects', 'manage_projects',
    'view_delivery', 'manage_delivery', 'view_employees', 'view_attendance', 'view_crm',
    'manage_crm', 'view_reports', 'view_documents'
  ],

  'Sales Executive': [
    'view_dashboard', 'view_customers', 'manage_customers', 'view_products', 'view_sales',
    'manage_sales', 'view_billing', 'view_projects', 'view_crm', 'manage_crm'
  ],

  'Purchase Manager': [
    'view_dashboard', 'view_suppliers', 'manage_suppliers', 'view_products', 'view_inventory',
    'view_purchase', 'manage_purchase', 'view_reports', 'view_documents'
  ],

  'Warehouse Manager': [
    'view_dashboard', 'view_production', 'view_products', 'manage_products', 'view_inventory', 'manage_inventory',
    'view_purchase', 'view_delivery', 'manage_delivery'
  ],

  'HR': [
    'view_dashboard', 'view_labour_wages', 'manage_labour_wages', 'view_employees', 'manage_employees', 'view_attendance', 'manage_attendance',
    'view_payroll', 'manage_payroll', 'view_documents'
  ],

  'Accountant': [
    'view_dashboard', 'view_labour_wages', 'view_customers', 'view_suppliers', 'view_billing', 'manage_billing',
    'view_accounting', 'manage_accounting', 'view_payroll', 'view_reports', 'view_documents'
  ],

  'Driver': [
    'view_delivery', 'manage_delivery'
  ],

  'Customer': [
    'view_sales', 'view_billing', 'view_projects', 'view_delivery'
  ],

  'Supplier': [
    'view_purchase', 'view_products'
  ],
};

export function hasRolePermission(role: UserRole, action: PermissionAction, user?: UserProfile | null): boolean {
  if (role === 'Super Admin') return true;

  // If user is a Worker and has specific custom permissions assigned by their Admin:
  if (role === 'Worker' && user?.permissions && user.permissions.length > 0) {
    // If the assigned array contains the action or 'all'
    return user.permissions.includes(action) || user.permissions.includes('all');
  }

  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(action);
}
