import { supabase } from './supabase';
import {
  Company,
  Branch,
  UserProfile,
  Customer,
  Supplier,
  Product,
  SubscriptionPlan,
  SubscriptionStatus,
} from '../types';

// ==========================================
// 1. COMPANIES & SUPER ADMIN
// ==========================================
export async function fetchLiveCompanies(): Promise<Company[]> {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.warn('Live fetch companies error:', error);
      return [];
    }
    // Return all customer tenant companies
    return (data as Company[]).filter((c) => c.gstin !== '27PLATFORM00001');
  } catch (err) {
    console.error('fetchLiveCompanies exception:', err);
    return [];
  }
}

export async function createLiveCompany(company: Partial<Company>): Promise<Company | null> {
  try {
    const { data, error } = await supabase
      .from('companies')
      .insert([company])
      .select()
      .single();

    if (error) throw error;
    return data as Company;
  } catch (err) {
    console.error('createLiveCompany error:', err);
    return null;
  }
}

export async function updateLiveCompanySubscription(
  companyId: string,
  status: SubscriptionStatus,
  plan?: SubscriptionPlan,
  expiresAt?: string,
  price?: number,
  maxWorkers?: number
): Promise<boolean> {
  try {
    const updates: any = {
      subscription_status: status,
      updated_at: new Date().toISOString(),
    };
    if (plan) updates.subscription_plan = plan;
    if (expiresAt) updates.subscription_expires_at = expiresAt;
    if (price !== undefined) updates.subscription_price = price;
    if (maxWorkers !== undefined) updates.max_workers = maxWorkers;

    const { error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', companyId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('updateLiveCompanySubscription error:', err);
    return false;
  }
}

// ==========================================
// 2. USER PROFILES & WORKERS
// ==========================================
export async function fetchLiveWorkers(companyId?: string): Promise<UserProfile[]> {
  try {
    let query = supabase.from('user_profiles').select('*');
    if (companyId && companyId !== 'all') {
      query = query.eq('company_id', companyId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as UserProfile[];
  } catch (err) {
    console.error('fetchLiveWorkers error:', err);
    return [];
  }
}

export async function fetchLiveUserProfile(email: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .maybeSingle();

    if (error || !data) return null;
    return data as UserProfile;
  } catch (err) {
    console.error('fetchLiveUserProfile error:', err);
    return null;
  }
}

export async function createLiveWorker(worker: Partial<UserProfile>): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([worker])
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  } catch (err) {
    console.error('createLiveWorker error:', err);
    return null;
  }
}

export async function updateLiveWorker(id: string, updates: Partial<UserProfile>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('updateLiveWorker error:', err);
    return false;
  }
}

export async function deleteLiveWorker(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('deleteLiveWorker error:', err);
    return false;
  }
}

// ==========================================
// 3. PRODUCTS & PRICE MASTER
// ==========================================
export async function fetchLiveProducts(companyId?: string): Promise<Product[]> {
  try {
    let query = supabase.from('products').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as Product[];
  } catch (err) {
    console.error('fetchLiveProducts error:', err);
    return [];
  }
}

export async function createLiveProduct(product: Partial<Product>): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  } catch (err) {
    console.error('createLiveProduct error:', err);
    return null;
  }
}

export async function deleteLiveProduct(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('deleteLiveProduct error:', err);
    return false;
  }
}

// ==========================================
// 4. CUSTOMERS
// ==========================================
export async function fetchLiveCustomers(companyId?: string): Promise<Customer[]> {
  try {
    let query = supabase.from('customers').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as Customer[];
  } catch (err) {
    console.error('fetchLiveCustomers error:', err);
    return [];
  }
}

export async function createLiveCustomer(customer: Partial<Customer>): Promise<Customer | null> {
  try {
    const { data, error } = await supabase
      .from('customers')
      .insert([customer])
      .select()
      .single();

    if (error) throw error;
    return data as Customer;
  } catch (err) {
    console.error('createLiveCustomer error:', err);
    return null;
  }
}

export async function deleteLiveCustomer(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('deleteLiveCustomer error:', err);
    return false;
  }
}

// ==========================================
// 5. SUPPLIERS
// ==========================================
export async function fetchLiveSuppliers(companyId?: string): Promise<Supplier[]> {
  try {
    let query = supabase.from('suppliers').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as Supplier[];
  } catch (err) {
    console.error('fetchLiveSuppliers error:', err);
    return [];
  }
}

export async function createLiveSupplier(supplier: Partial<Supplier>): Promise<Supplier | null> {
  try {
    const { data, error } = await supabase
      .from('suppliers')
      .insert([supplier])
      .select()
      .single();

    if (error) throw error;
    return data as Supplier;
  } catch (err) {
    console.error('createLiveSupplier error:', err);
    return null;
  }
}

export async function deleteLiveSupplier(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('suppliers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('deleteLiveSupplier error:', err);
    return false;
  }
}

// ==========================================
// 6. PRODUCTION BATCHES
// ==========================================
export interface ProductionBatch {
  id: string;
  company_id: string;
  batch_no: string;
  product_id?: string;
  product_name: string;
  planned_qty: number;
  produced_qty: number;
  rejected_qty: number;
  unit: string;
  status: 'Scheduled' | 'In Production' | 'Quality Check' | 'Completed' | 'Cancelled';
  machinery_id?: string;
  operator_name?: string;
  start_time: string;
  end_time?: string;
  notes?: string;
  created_at: string;
}

export async function fetchLiveProductionBatches(companyId?: string): Promise<ProductionBatch[]> {
  try {
    let query = supabase.from('production_batches').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as ProductionBatch[];
  } catch (err) {
    console.error('fetchLiveProductionBatches error:', err);
    return [];
  }
}

export async function createLiveProductionBatch(batch: Partial<ProductionBatch>): Promise<ProductionBatch | null> {
  try {
    const { data, error } = await supabase
      .from('production_batches')
      .insert([batch])
      .select()
      .single();

    if (error) throw error;
    return data as ProductionBatch;
  } catch (err) {
    console.error('createLiveProductionBatch error:', err);
    return null;
  }
}

// ==========================================
// 7. LABOUR WAGES
// ==========================================
export interface LabourWageRecord {
  id: string;
  company_id: string;
  worker_name: string;
  task_type: string;
  piece_rate: number;
  units_completed: number;
  total_wage: number;
  date: string;
  shift: string;
  status: 'Pending' | 'Approved' | 'Paid';
  notes?: string;
  created_at: string;
}

export async function fetchLiveLabourWages(companyId?: string): Promise<LabourWageRecord[]> {
  try {
    let query = supabase.from('labour_wages').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as LabourWageRecord[];
  } catch (err) {
    console.error('fetchLiveLabourWages error:', err);
    return [];
  }
}

export async function createLiveLabourWage(wage: Partial<LabourWageRecord>): Promise<LabourWageRecord | null> {
  try {
    const { data, error } = await supabase
      .from('labour_wages')
      .insert([wage])
      .select()
      .single();

    if (error) throw error;
    return data as LabourWageRecord;
  } catch (err) {
    console.error('createLiveLabourWage error:', err);
    return null;
  }
}

// ==========================================
// 8. DELIVERY CHALLANS
// ==========================================
export interface DeliveryChallan {
  id: string;
  company_id: string;
  challan_no: string;
  customer_id?: string;
  customer_name: string;
  vehicle_no: string;
  driver_name: string;
  driver_phone?: string;
  destination: string;
  items?: any[];
  total_qty: number;
  status: 'Preparing' | 'Dispatched' | 'In Transit' | 'Delivered' | 'Cancelled';
  gate_pass_no?: string;
  dispatch_time: string;
  delivered_time?: string;
  created_at: string;
}

export async function fetchLiveDeliveryChallans(companyId?: string): Promise<DeliveryChallan[]> {
  try {
    let query = supabase.from('delivery_challans').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as DeliveryChallan[];
  } catch (err) {
    console.error('fetchLiveDeliveryChallans error:', err);
    return [];
  }
}

export async function createLiveDeliveryChallan(challan: Partial<DeliveryChallan>): Promise<DeliveryChallan | null> {
  try {
    const { data, error } = await supabase
      .from('delivery_challans')
      .insert([challan])
      .select()
      .single();

    if (error) throw error;
    return data as DeliveryChallan;
  } catch (err) {
    console.error('createLiveDeliveryChallan error:', err);
    return null;
  }
}

// ==========================================
// 9. INVOICES & BILLING
// ==========================================
export interface InvoiceRecord {
  id: string;
  company_id: string;
  invoice_no: string;
  customer_id?: string;
  customer_name: string;
  customer_gstin?: string;
  items?: any[];
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  paid_amount: number;
  payment_status: 'Pending' | 'Partially Paid' | 'Paid' | 'Overdue';
  due_date?: string;
  created_at: string;
}

export async function fetchLiveInvoices(companyId?: string): Promise<InvoiceRecord[]> {
  try {
    let query = supabase.from('invoices').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as InvoiceRecord[];
  } catch (err) {
    console.error('fetchLiveInvoices error:', err);
    return [];
  }
}

export async function createLiveInvoice(inv: Partial<InvoiceRecord>): Promise<InvoiceRecord | null> {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .insert([inv])
      .select()
      .single();

    if (error) throw error;
    return data as InvoiceRecord;
  } catch (err) {
    console.error('createLiveInvoice error:', err);
    return null;
  }
}

// ==========================================
// 10. EMPLOYEES & ATTENDANCE
// ==========================================
export interface EmployeeRecord {
  id: string;
  company_id: string;
  branch_id?: string;
  full_name: string;
  email?: string;
  phone: string;
  designation: string;
  department: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Resigned' | 'Suspended';
  joining_date: string;
  created_at: string;
}

export async function fetchLiveEmployees(companyId?: string): Promise<EmployeeRecord[]> {
  try {
    let query = supabase.from('employees').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as EmployeeRecord[];
  } catch (err) {
    console.error('fetchLiveEmployees error:', err);
    return [];
  }
}

export async function createLiveEmployee(emp: Partial<EmployeeRecord>): Promise<EmployeeRecord | null> {
  try {
    const { data, error } = await supabase
      .from('employees')
      .insert([emp])
      .select()
      .single();

    if (error) throw error;
    return data as EmployeeRecord;
  } catch (err) {
    console.error('createLiveEmployee error:', err);
    return null;
  }
}

export interface AttendanceRecord {
  id: string;
  company_id: string;
  employee_id?: string;
  employee_name: string;
  date: string;
  clock_in: string;
  clock_out?: string;
  status: 'Present' | 'Half Day' | 'Late' | 'Absent';
  location_lat?: number;
  location_lng?: number;
  is_geofence_verified: boolean;
  created_at: string;
}

export async function fetchLiveAttendance(companyId?: string): Promise<AttendanceRecord[]> {
  try {
    let query = supabase.from('attendance_records').select('*');
    if (companyId) {
      query = query.eq('company_id', companyId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as AttendanceRecord[];
  } catch (err) {
    console.error('fetchLiveAttendance error:', err);
    return [];
  }
}

export async function createLiveAttendance(att: Partial<AttendanceRecord>): Promise<AttendanceRecord | null> {
  try {
    const { data, error } = await supabase
      .from('attendance_records')
      .insert([att])
      .select()
      .single();

    if (error) throw error;
    return data as AttendanceRecord;
  } catch (err) {
    console.error('createLiveAttendance error:', err);
    return null;
  }
}
