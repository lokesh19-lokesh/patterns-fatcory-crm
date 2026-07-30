import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';
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
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="company" element={<CompanyPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="purchase" element={<PurchasePage />} />
            <Route path="sales" element={<SalesPage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="accounting" element={<AccountingPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="payroll" element={<PayrollPage />} />
            <Route path="crm" element={<CrmPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
