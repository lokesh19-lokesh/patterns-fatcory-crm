import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute, PermissionGate } from './ProtectedRoute';
import { LoginPage } from '../features/auth/LoginPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { CompanyPage } from '../features/company/CompanyPage';
import { CustomersPage } from '../features/customers/CustomersPage';
import { SuppliersPage } from '../features/suppliers/SuppliersPage';
import { ProductsPage } from '../features/products/ProductsPage';
import { InventoryPage } from '../features/inventory/InventoryPage';
import { PurchasePage } from '../features/purchase/PurchasePage';
import { SalesPage } from '../features/sales/SalesPage';
import { BillingPage } from '../features/billing/BillingPage';
import { AccountingPage } from '../features/accounting/AccountingPage';
import { ProjectsPage } from '../features/project-management/ProjectsPage';
import { DeliveryPage } from '../features/logistics-delivery/DeliveryPage';
import { EmployeesPage } from '../features/hr-payroll/EmployeesPage';
import { AttendancePage } from '../features/hr-payroll/AttendancePage';
import { PayrollPage } from '../features/hr-payroll/PayrollPage';
import { CrmPage } from '../features/crm/CrmPage';
import { ReportsPage } from '../features/reports/ReportsPage';
import { DocumentsPage } from '../features/documents/DocumentsPage';
import { SettingsPage } from '../features/settings/SettingsPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />

            {/* CORE OPERATIONAL HQ */}
            <Route path="dashboard" element={<PermissionGate permission="view_dashboard"><DashboardPage /></PermissionGate>} />
            <Route path="company" element={<PermissionGate permission="manage_company"><CompanyPage /></PermissionGate>} />
            <Route path="crm" element={<PermissionGate permission="view_crm"><CrmPage /></PermissionGate>} />

            {/* PARTNERS & MATERIAL MASTER */}
            <Route path="customers" element={<PermissionGate permission="view_customers"><CustomersPage /></PermissionGate>} />
            <Route path="suppliers" element={<PermissionGate permission="view_suppliers"><SuppliersPage /></PermissionGate>} />
            <Route path="products" element={<PermissionGate permission="view_products"><ProductsPage /></PermissionGate>} />
            <Route path="inventory" element={<PermissionGate permission="view_inventory"><InventoryPage /></PermissionGate>} />

            {/* COMMERCIAL & LOGISTICS */}
            <Route path="purchase" element={<PermissionGate permission="view_purchase"><PurchasePage /></PermissionGate>} />
            <Route path="sales" element={<PermissionGate permission="view_sales"><SalesPage /></PermissionGate>} />
            <Route path="billing" element={<PermissionGate permission="view_billing"><BillingPage /></PermissionGate>} />
            <Route path="delivery" element={<PermissionGate permission="view_delivery"><DeliveryPage /></PermissionGate>} />

            {/* PROJECTS & WORKFORCE */}
            <Route path="projects" element={<PermissionGate permission="view_projects"><ProjectsPage /></PermissionGate>} />
            <Route path="employees" element={<PermissionGate permission="view_employees"><EmployeesPage /></PermissionGate>} />
            <Route path="attendance" element={<PermissionGate permission="view_attendance"><AttendancePage /></PermissionGate>} />
            <Route path="payroll" element={<PermissionGate permission="view_payroll"><PayrollPage /></PermissionGate>} />

            {/* FINANCE & GOVERNANCE */}
            <Route path="accounting" element={<PermissionGate permission="view_accounting"><AccountingPage /></PermissionGate>} />
            <Route path="reports" element={<PermissionGate permission="view_reports"><ReportsPage /></PermissionGate>} />
            <Route path="documents" element={<PermissionGate permission="view_documents"><DocumentsPage /></PermissionGate>} />
            <Route path="settings" element={<PermissionGate permission="view_settings"><SettingsPage /></PermissionGate>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
