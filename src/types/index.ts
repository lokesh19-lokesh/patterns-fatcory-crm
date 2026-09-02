export type UserRole = 
  | 'Super Admin'
  | 'End User'
  | 'Admin'
  | 'Worker'
  | 'Company Admin'
  | 'Manager'
  | 'Sales Executive'
  | 'Purchase Manager'
  | 'Warehouse Manager'
  | 'HR'
  | 'Accountant'
  | 'Driver'
  | 'Customer'
  | 'Supplier';

export type SubscriptionStatus = 'Active' | 'Trial' | 'Suspended' | 'Cancelled' | 'Expired';
export type SubscriptionPlan = 'Starter' | 'Professional' | 'Enterprise' | 'Custom';

export interface Company {
  id: string;
  name: string;
  gstin: string;
  pan: string;
  email: string;
  phone: string;
  website?: string;
  logo_url?: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  bank_details: {
    bank_name: string;
    account_number: string;
    ifsc: string;
    branch: string;
  };
  branches_count?: number;
  subscription_plan: SubscriptionPlan;
  subscription_status: SubscriptionStatus;
  subscription_expires_at: string;
  subscription_price: number;
  billing_cycle: 'Monthly' | 'Quarterly' | 'Annual';
  max_workers: number;
  max_branches: number;
  admin_name?: string;
  admin_email?: string;
  created_at: string;
}

export interface Branch {
  id: string;
  company_id: string;
  name: string;
  code: string;
  gstin?: string;
  address: string;
  city: string;
  state: string;
  is_headquarters: boolean;
  phone: string;
  email: string;
}

export interface UserProfile {
  id: string;
  company_id: string;
  branch_id?: string;
  email: string;
  full_name: string;
  phone: string;
  role: UserRole;
  worker_designation?: string;
  assigned_by?: string;
  avatar_url?: string;
  department?: string;
  designation?: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  created_at: string;
  permissions?: string[];
}

export interface Customer {
  id: string;
  company_id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  gstin: string;
  pan: string;
  credit_limit: number;
  current_outstanding: number;
  payment_terms_days: number;
  category: 'Developer' | 'Contractor' | 'Retailer' | 'Individual';
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: 'Active' | 'Blocked';
  created_at: string;
}

export interface Supplier {
  id: string;
  company_id: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  gstin: string;
  pan: string;
  categories: string[];
  outstanding_balance: number;
  rating: number; // 1-5
  address: string;
  bank_name: string;
  account_number: string;
  ifsc: string;
  status: 'Active' | 'Blacklisted';
  created_at: string;
}

export interface Product {
  id: string;
  company_id: string;
  sku: string;
  barcode: string;
  name: string;
  category: string;
  brand: string;
  unit: 'MT' | 'Bags' | 'CuM' | 'SqFt' | 'Pieces' | 'Kgs' | 'Liters';
  hsn_code: string;
  gst_rate: number; // 0, 5, 12, 18, 28
  purchase_price: number;
  selling_price: number;
  opening_stock: number;
  current_stock: number;
  minimum_stock: number;
  image_url?: string;
  created_at: string;
}

export interface Warehouse {
  id: string;
  company_id: string;
  name: string;
  code: string;
  location: string;
  capacity_sqft: number;
  manager_name: string;
  manager_phone: string;
  current_occupancy_pct: number;
}

export interface InventoryMovement {
  id: string;
  company_id: string;
  warehouse_id: string;
  product_id: string;
  product_name: string;
  type: 'Stock In' | 'Stock Out' | 'Transfer' | 'Adjustment' | 'Damage' | 'Return';
  quantity: number;
  unit: string;
  reference_no: string;
  notes?: string;
  created_by: string;
  created_at: string;
}

export interface PurchaseOrder {
  id: string;
  company_id: string;
  po_number: string;
  supplier_id: string;
  supplier_name: string;
  po_date: string;
  expected_delivery_date: string;
  total_amount: number;
  tax_amount: number;
  grand_total: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Partially Received' | 'Completed' | 'Cancelled';
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    tax_rate: number;
    amount: number;
  }[];
}

export interface SalesOrder {
  id: string;
  company_id: string;
  order_number: string;
  customer_id: string;
  customer_name: string;
  project_site_name?: string;
  order_date: string;
  delivery_date: string;
  total_amount: number;
  gst_amount: number;
  grand_total: number;
  status: 'Quotation' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Invoiced' | 'Cancelled';
  payment_status: 'Unpaid' | 'Partial' | 'Paid';
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    gst_rate: number;
    total: number;
  }[];
}

export interface Invoice {
  id: string;
  company_id: string;
  invoice_number: string;
  sales_order_id?: string;
  customer_id: string;
  customer_name: string;
  customer_gstin: string;
  invoice_date: string;
  due_date: string;
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  grand_total: number;
  amount_paid: number;
  balance_due: number;
  status: 'Draft' | 'Issued' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Void';
  irn_qr_code?: string;
}

export interface Project {
  id: string;
  company_id: string;
  code: string;
  name: string;
  customer_id: string;
  customer_name: string;
  location: string;
  budget: number;
  material_spent_cost: number;
  start_date: string;
  completion_date: string;
  progress_pct: number;
  engineer_in_charge: string;
  status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed';
}

export interface DeliveryChallan {
  id: string;
  company_id: string;
  challan_number: string;
  sales_order_id: string;
  customer_name: string;
  delivery_address: string;
  vehicle_number: string;
  driver_name: string;
  driver_phone: string;
  dispatch_time: string;
  delivered_time?: string;
  driver_lat?: number;
  driver_lng?: number;
  otp_code?: string;
  customer_signature_url?: string;
  delivery_photo_url?: string;
  status: 'Pending Dispatch' | 'In Transit' | 'Delivered' | 'Rejected';
}

export interface Lead {
  id: string;
  company_id: string;
  title: string;
  contact_name: string;
  company_name: string;
  phone: string;
  email: string;
  source: 'Website' | 'Site Visit' | 'Referral' | 'Exhibition' | 'Phone Call';
  stage: 'New' | 'Contacted' | 'Site Inspection' | 'Quote Sent' | 'Negotiation' | 'Won' | 'Lost';
  estimated_value: number;
  material_requirement: string;
  assigned_to: string;
  next_followup_date: string;
  created_at: string;
}

export interface Employee {
  id: string;
  company_id: string;
  emp_code: string;
  full_name: string;
  email: string;
  phone: string;
  department: 'Sales' | 'Logistics' | 'Warehouse' | 'Accounts' | 'Engineering' | 'HR';
  designation: string;
  basic_salary: number;
  allowances: number;
  joining_date: string;
  pan: string;
  aadhaar: string;
  bank_account: string;
  status: 'Active' | 'On Leave' | 'Terminated';
}

export interface AttendanceRecord {
  id: string;
  employee_id: string;
  employee_name: string;
  date: string;
  check_in_time: string;
  check_out_time?: string;
  check_in_lat: number;
  check_in_lng: number;
  check_in_selfie_url?: string;
  status: 'Present' | 'Late' | 'Half Day' | 'Absent' | 'On Leave';
  overtime_hours: number;
}
