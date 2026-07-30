import { UserRole } from '../types';

export type PermissionAction =
  | 'view_dashboard'
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

export const ROLE_PERMISSIONS: Record<UserRole, PermissionAction[]> = {
  'Super Admin': [
    'view_dashboard', 'manage_company', 'manage_users', 'view_customers', 'manage_customers',
    'view_suppliers', 'manage_suppliers', 'view_products', 'manage_products', 'view_inventory',
    'manage_inventory', 'view_purchase', 'manage_purchase', 'view_sales', 'manage_sales',
    'view_billing', 'manage_billing', 'view_accounting', 'manage_accounting', 'view_projects',
    'manage_projects', 'view_delivery', 'manage_delivery', 'view_employees', 'manage_employees',
    'view_attendance', 'manage_attendance', 'view_payroll', 'manage_payroll', 'view_crm',
    'manage_crm', 'view_reports', 'view_documents', 'manage_documents', 'view_settings'
  ],

  'Company Admin': [
    'view_dashboard', 'manage_company', 'manage_users', 'view_customers', 'manage_customers',
    'view_suppliers', 'manage_suppliers', 'view_products', 'manage_products', 'view_inventory',
    'manage_inventory', 'view_purchase', 'manage_purchase', 'view_sales', 'manage_sales',
    'view_billing', 'manage_billing', 'view_accounting', 'manage_accounting', 'view_projects',
    'manage_projects', 'view_delivery', 'manage_delivery', 'view_employees', 'manage_employees',
    'view_attendance', 'manage_attendance', 'view_payroll', 'manage_payroll', 'view_crm',
    'manage_crm', 'view_reports', 'view_documents', 'manage_documents', 'view_settings'
  ],

  'Manager': [
    'view_dashboard', 'view_customers', 'manage_customers', 'view_suppliers', 'view_products',
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
    'view_dashboard', 'view_products', 'manage_products', 'view_inventory', 'manage_inventory',
    'view_purchase', 'view_delivery', 'manage_delivery'
  ],

  'HR': [
    'view_dashboard', 'view_employees', 'manage_employees', 'view_attendance', 'manage_attendance',
    'view_payroll', 'manage_payroll', 'view_documents'
  ],

  'Accountant': [
    'view_dashboard', 'view_customers', 'view_suppliers', 'view_billing', 'manage_billing',
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

export function hasRolePermission(role: UserRole, action: PermissionAction): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(action);
}
