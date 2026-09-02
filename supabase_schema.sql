-- ==============================================================================
-- PATTERNS ERP CLOUD - MASTER PRODUCTION DATABASE SCHEMA (100% DYNAMIC)
-- Sole Super Admin: brickserpsoftware@gmail.com
-- ==============================================================================

-- 1. Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 2. COMPANIES TABLE (Factory Workspaces & Master Subscriptions)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  gstin VARCHAR(50),
  pan VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  website VARCHAR(255),
  logo_url TEXT,
  address JSONB DEFAULT '{"street": "", "city": "Pune", "state": "Maharashtra", "pincode": "411001", "country": "India"}'::jsonb,
  bank_details JSONB DEFAULT '{}'::jsonb,
  subscription_plan VARCHAR(50) DEFAULT 'Growth Plan',
  subscription_status VARCHAR(50) DEFAULT 'Active',
  subscription_expires_at TIMESTAMPTZ DEFAULT (NOW() + interval '365 days'),
  subscription_price NUMERIC(12, 2) DEFAULT 9999.00,
  billing_cycle VARCHAR(50) DEFAULT 'yearly',
  max_workers INT DEFAULT 50,
  max_branches INT DEFAULT 3,
  admin_name VARCHAR(255),
  admin_email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. USER PROFILES TABLE (Dynamic Access & Secure Auth)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(50) NOT NULL DEFAULT 'Admin',
  department VARCHAR(100),
  designation VARCHAR(100),
  worker_designation VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Active',
  avatar_url TEXT,
  permissions JSONB DEFAULT '[]'::jsonb,
  assigned_by VARCHAR(255),
  password_hash TEXT,
  reset_otp VARCHAR(10),
  otp_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. COMPANY BRANCHES & WAREHOUSES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.company_branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  branch_code VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  phone VARCHAR(50),
  is_headquarters BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.warehouses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.company_branches(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  capacity VARCHAR(100),
  supervisor VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. PRODUCTS & INVENTORY TRANSACTIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100),
  category VARCHAR(100) DEFAULT 'Fly Ash Bricks',
  description TEXT,
  unit VARCHAR(50) DEFAULT 'pcs',
  dimensions VARCHAR(100),
  standard_rate NUMERIC(10, 2) DEFAULT 0.00,
  tax_rate NUMERIC(5, 2) DEFAULT 18.00,
  hsn_code VARCHAR(50) DEFAULT '68159990',
  current_stock NUMERIC(12, 2) DEFAULT 0,
  min_stock_level NUMERIC(12, 2) DEFAULT 500,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.inventory_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  transaction_type VARCHAR(50) NOT NULL, -- 'IN', 'OUT', 'ADJUSTMENT'
  quantity NUMERIC(12, 2) NOT NULL,
  reference_no VARCHAR(100),
  reason TEXT,
  recorded_by VARCHAR(255),
  transaction_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. CUSTOMERS & SUPPLIERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  gstin VARCHAR(50),
  billing_address TEXT,
  shipping_address TEXT,
  city VARCHAR(100),
  state VARCHAR(100) DEFAULT 'Maharashtra',
  outstanding_balance NUMERIC(12, 2) DEFAULT 0.00,
  credit_limit NUMERIC(12, 2) DEFAULT 50000.00,
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  gstin VARCHAR(50),
  raw_material_supplied VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100) DEFAULT 'Maharashtra',
  outstanding_balance NUMERIC(12, 2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. PRODUCTION BATCHES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.production_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  batch_number VARCHAR(100) NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  planned_quantity NUMERIC(12, 2) NOT NULL,
  produced_quantity NUMERIC(12, 2) DEFAULT 0,
  damaged_quantity NUMERIC(12, 2) DEFAULT 0,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  status VARCHAR(50) DEFAULT 'In Progress', -- 'Planned', 'In Progress', 'Completed', 'Cancelled'
  fly_ash_used_tons NUMERIC(10, 2) DEFAULT 0,
  cement_used_bags NUMERIC(10, 2) DEFAULT 0,
  sand_used_tons NUMERIC(10, 2) DEFAULT 0,
  supervisor VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. INVOICES & DELIVERIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  invoice_number VARCHAR(100) NOT NULL,
  invoice_date DATE DEFAULT CURRENT_DATE,
  due_date DATE DEFAULT (CURRENT_DATE + 30),
  subtotal NUMERIC(12, 2) DEFAULT 0.00,
  tax_amount NUMERIC(12, 2) DEFAULT 0.00,
  discount_amount NUMERIC(12, 2) DEFAULT 0.00,
  total_amount NUMERIC(12, 2) NOT NULL,
  paid_amount NUMERIC(12, 2) DEFAULT 0.00,
  payment_status VARCHAR(50) DEFAULT 'Unpaid', -- 'Paid', 'Partial', 'Unpaid', 'Overdue'
  items JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.delivery_challans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  challan_number VARCHAR(100) NOT NULL,
  delivery_date DATE DEFAULT CURRENT_DATE,
  vehicle_number VARCHAR(50),
  driver_name VARCHAR(100),
  driver_phone VARCHAR(50),
  delivery_address TEXT,
  status VARCHAR(50) DEFAULT 'In Transit', -- 'Scheduled', 'In Transit', 'Delivered', 'Cancelled'
  items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. EMPLOYEES, ATTENDANCE & LABOUR WAGES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  employee_code VARCHAR(50),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  designation VARCHAR(100),
  department VARCHAR(100),
  daily_wage NUMERIC(10, 2) DEFAULT 500.00,
  monthly_salary NUMERIC(12, 2),
  wage_type VARCHAR(50) DEFAULT 'Daily', -- 'Daily', 'Monthly', 'Piece Rate'
  joining_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(50) DEFAULT 'Present', -- 'Present', 'Absent', 'Half Day', 'Overtime'
  overtime_hours NUMERIC(4, 2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, employee_id, date)
);

CREATE TABLE IF NOT EXISTS public.labour_wages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_days_worked NUMERIC(5, 2) DEFAULT 0,
  overtime_hours NUMERIC(6, 2) DEFAULT 0,
  base_wage_amount NUMERIC(12, 2) DEFAULT 0.00,
  overtime_amount NUMERIC(12, 2) DEFAULT 0.00,
  bonus_amount NUMERIC(12, 2) DEFAULT 0.00,
  deductions NUMERIC(12, 2) DEFAULT 0.00,
  net_payable NUMERIC(12, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'Pending', -- 'Paid', 'Pending'
  payment_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. STORED PROCEDURES & AUTHENTICATION RPCs
-- ------------------------------------------------------------------------------

-- Procedure: Verify Password Login
DROP FUNCTION IF EXISTS verify_user_login(text,text);
CREATE OR REPLACE FUNCTION verify_user_login(p_email text, p_password text)
RETURNS TABLE (
  is_valid boolean, 
  user_id uuid, 
  company_id uuid, 
  user_role text, 
  user_full_name text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user public.user_profiles%ROWTYPE;
BEGIN
  SELECT * INTO v_user 
  FROM public.user_profiles 
  WHERE lower(email) = lower(p_email) 
  LIMIT 1;
  
  IF v_user.id IS NULL THEN
    RETURN QUERY SELECT false, NULL::uuid, NULL::uuid, NULL::text, NULL::text;
    RETURN;
  END IF;

  -- Validate password with bcrypt crypt
  IF v_user.password_hash IS NOT NULL AND v_user.password_hash = crypt(p_password, v_user.password_hash) THEN
    RETURN QUERY SELECT true, v_user.id, v_user.company_id, v_user.role::text, v_user.full_name::text;
  ELSE
    RETURN QUERY SELECT false, NULL::uuid, NULL::uuid, NULL::text, NULL::text;
  END IF;
END;
$$;

-- Procedure: Generate 6-Digit OTP
CREATE OR REPLACE FUNCTION generate_user_otp(p_email text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_otp text;
BEGIN
  v_otp := lpad(floor(random() * 1000000)::text, 6, '0');
  
  UPDATE public.user_profiles
  SET reset_otp = v_otp,
      otp_expires_at = NOW() + interval '10 minutes'
  WHERE lower(email) = lower(p_email);
  
  RETURN v_otp;
END;
$$;

-- Procedure: Verify OTP Code
CREATE OR REPLACE FUNCTION verify_user_otp(p_email text, p_otp text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_match boolean;
BEGIN
  SELECT (reset_otp = p_otp AND otp_expires_at > NOW()) INTO v_match
  FROM public.user_profiles
  WHERE lower(email) = lower(p_email);

  IF coalesce(v_match, false) THEN
    UPDATE public.user_profiles
    SET reset_otp = NULL, otp_expires_at = NULL
    WHERE lower(email) = lower(p_email);
    RETURN true;
  END IF;

  RETURN false;
END;
$$;

-- Procedure: Reset User Password
CREATE OR REPLACE FUNCTION reset_user_password(p_email text, p_new_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_profiles
  SET password_hash = crypt(p_new_password, gen_salt('bf')),
      reset_otp = NULL,
      otp_expires_at = NULL
  WHERE lower(email) = lower(p_email);

  RETURN FOUND;
END;
$$;

-- Make sure gstin and pan are flexible for platform master and new registrations
ALTER TABLE IF EXISTS public.companies ALTER COLUMN gstin DROP NOT NULL;
ALTER TABLE IF EXISTS public.companies ALTER COLUMN pan DROP NOT NULL;

-- ------------------------------------------------------------------------------
-- 11. SEED SOLE SUPER ADMIN (brickserpsoftware@gmail.com)
-- ------------------------------------------------------------------------------
DO $$
DECLARE
  v_company_id UUID;
  v_auth_id UUID;
BEGIN
  -- 1. Create or get Platform Master Company
  SELECT id INTO v_company_id FROM public.companies LIMIT 1;
  IF v_company_id IS NULL THEN
    INSERT INTO public.companies (
      name, gstin, pan, email, phone, address, subscription_plan, subscription_status
    )
    VALUES (
      'Patterns Cloud Enterprise Platform',
      '27AAAAA0000A1Z5',
      'AAAAA0000A',
      'brickserpsoftware@gmail.com',
      '+91 90000 00001',
      '{"street": "Patterns High-Tech Zone", "city": "Pune", "state": "Maharashtra", "pincode": "411001", "country": "India"}'::jsonb,
      'Enterprise',
      'Active'
    )
    RETURNING id INTO v_company_id;
  END IF;

  -- 2. Get auth user ID for brickserpsoftware@gmail.com
  SELECT id INTO v_auth_id FROM auth.users WHERE lower(email) = 'brickserpsoftware@gmail.com' LIMIT 1;

  IF v_auth_id IS NULL THEN
    v_auth_id := 'e4ab3563-fd86-4d23-86ea-e6477972ecc9'::uuid;
  END IF;

  -- 3. Clear any other profiles and insert the sole Super Admin profile
  DELETE FROM public.user_profiles;
  
  INSERT INTO public.user_profiles (
    id,
    company_id,
    email,
    full_name,
    phone,
    role,
    department,
    designation,
    status,
    permissions,
    password_hash
  )
  VALUES (
    v_auth_id,
    v_company_id,
    'brickserpsoftware@gmail.com',
    'Patterns Super Admin',
    '+91 90000 00001',
    'Super Admin',
    'Platform Architecture & Subscriptions',
    'Sole Platform Super Admin',
    'Active',
    '["all"]'::jsonb,
    crypt('Tpc@123', gen_salt('bf'))
  );
END $$;
