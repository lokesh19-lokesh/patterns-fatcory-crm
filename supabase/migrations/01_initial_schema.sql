-- ============================================================================
-- PATTERNS FACTORY OS - ENTERPRISE MULTI-TENANT DB MIGRATION & RLS POLICIES
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CORE TENANCY TABLES
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    gstin VARCHAR(15) UNIQUE NOT NULL,
    pan VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    website VARCHAR(255),
    logo_url TEXT,
    address JSONB DEFAULT '{}'::jsonb,
    bank_details JSONB DEFAULT '{}'::jsonb,
    subscription_plan VARCHAR(50) DEFAULT 'Enterprise',
    subscription_status VARCHAR(50) DEFAULT 'Active' CHECK (subscription_status IN ('Active', 'Trial', 'Suspended', 'Cancelled', 'Expired')),
    subscription_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 year'),
    subscription_price NUMERIC(15, 2) DEFAULT 49999.00,
    billing_cycle VARCHAR(20) DEFAULT 'Annual',
    max_workers INT DEFAULT 50,
    max_branches INT DEFAULT 10,
    admin_name VARCHAR(255),
    admin_email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add columns if table already existed previously
ALTER TABLE companies ADD COLUMN IF NOT EXISTS subscription_plan VARCHAR(50) DEFAULT 'Enterprise';
ALTER TABLE companies ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50) DEFAULT 'Active';
ALTER TABLE companies ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 year');
ALTER TABLE companies ADD COLUMN IF NOT EXISTS subscription_price NUMERIC(15, 2) DEFAULT 49999.00;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS billing_cycle VARCHAR(20) DEFAULT 'Annual';
ALTER TABLE companies ADD COLUMN IF NOT EXISTS max_workers INT DEFAULT 50;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS max_branches INT DEFAULT 10;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS admin_name VARCHAR(255);
ALTER TABLE companies ADD COLUMN IF NOT EXISTS admin_email VARCHAR(255);

CREATE TABLE IF NOT EXISTS company_branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    gstin VARCHAR(15),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    is_headquarters BOOLEAN DEFAULT FALSE,
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES company_branches(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL CHECK (role IN ('Super Admin', 'Admin', 'Worker', 'Company Admin', 'Manager', 'Sales Executive', 'Purchase Manager', 'Warehouse Manager', 'HR', 'Accountant', 'Driver', 'Customer', 'Supplier')),
    worker_designation VARCHAR(150),
    assigned_by VARCHAR(255),
    avatar_url TEXT,
    department VARCHAR(100),
    designation VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Suspended')),
    permissions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS worker_designation VARCHAR(150);
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS assigned_by VARCHAR(255);

-- 3. CUSTOMER & SUPPLIER TABLES
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    gstin VARCHAR(15),
    pan VARCHAR(10),
    credit_limit NUMERIC(15, 2) DEFAULT 0.00,
    current_outstanding NUMERIC(15, 2) DEFAULT 0.00,
    payment_terms_days INT DEFAULT 30,
    category VARCHAR(50) DEFAULT 'Contractor',
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    gstin VARCHAR(15),
    pan VARCHAR(10),
    categories TEXT[] DEFAULT '{}',
    outstanding_balance NUMERIC(15, 2) DEFAULT 0.00,
    rating INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    address TEXT,
    bank_name VARCHAR(255),
    account_number VARCHAR(100),
    ifsc VARCHAR(20),
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCT & INVENTORY MASTER
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    sku VARCHAR(100) NOT NULL,
    barcode VARCHAR(100),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    unit VARCHAR(20) NOT NULL CHECK (unit IN ('MT', 'Bags', 'CuM', 'SqFt', 'Pieces', 'Kgs', 'Liters')),
    hsn_code VARCHAR(20) NOT NULL,
    gst_rate NUMERIC(5, 2) NOT NULL DEFAULT 18.00,
    purchase_price NUMERIC(15, 2) NOT NULL,
    selling_price NUMERIC(15, 2) NOT NULL,
    opening_stock NUMERIC(15, 2) DEFAULT 0.00,
    current_stock NUMERIC(15, 2) DEFAULT 0.00,
    minimum_stock NUMERIC(15, 2) DEFAULT 10.00,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_sku_per_company UNIQUE (company_id, sku)
);

CREATE TABLE IF NOT EXISTS warehouses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    location TEXT NOT NULL,
    capacity_sqft NUMERIC(12, 2),
    manager_name VARCHAR(255),
    manager_phone VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inventory_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    warehouse_id UUID NOT NULL REFERENCES warehouses(id),
    product_id UUID NOT NULL REFERENCES products(id),
    type VARCHAR(50) NOT NULL CHECK (type IN ('Stock In', 'Stock Out', 'Transfer', 'Adjustment', 'Damage', 'Return')),
    quantity NUMERIC(15, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    reference_no VARCHAR(100),
    notes TEXT,
    created_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS production_batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    batch_no VARCHAR(100) NOT NULL,
    product_id UUID REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    planned_qty NUMERIC(15, 2) NOT NULL,
    produced_qty NUMERIC(15, 2) DEFAULT 0.00,
    rejected_qty NUMERIC(15, 2) DEFAULT 0.00,
    unit VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'In Production' CHECK (status IN ('Scheduled', 'In Production', 'Quality Check', 'Completed', 'Cancelled')),
    machinery_id VARCHAR(100),
    operator_name VARCHAR(255),
    start_time TIMESTAMPTZ DEFAULT NOW(),
    end_time TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS labour_wages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    worker_name VARCHAR(255) NOT NULL,
    task_type VARCHAR(100) NOT NULL,
    piece_rate NUMERIC(15, 2) NOT NULL,
    units_completed NUMERIC(15, 2) NOT NULL,
    total_wage NUMERIC(15, 2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    shift VARCHAR(20) DEFAULT 'Day',
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Paid')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS delivery_challans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    challan_no VARCHAR(100) NOT NULL,
    customer_id UUID REFERENCES customers(id),
    customer_name VARCHAR(255) NOT NULL,
    vehicle_no VARCHAR(50) NOT NULL,
    driver_name VARCHAR(255) NOT NULL,
    driver_phone VARCHAR(20),
    destination TEXT NOT NULL,
    items JSONB DEFAULT '[]'::jsonb,
    total_qty NUMERIC(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Dispatched' CHECK (status IN ('Preparing', 'Dispatched', 'In Transit', 'Delivered', 'Cancelled')),
    gate_pass_no VARCHAR(100),
    dispatch_time TIMESTAMPTZ DEFAULT NOW(),
    delivered_time TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    invoice_no VARCHAR(100) NOT NULL,
    customer_id UUID REFERENCES customers(id),
    customer_name VARCHAR(255) NOT NULL,
    customer_gstin VARCHAR(15),
    items JSONB DEFAULT '[]'::jsonb,
    subtotal NUMERIC(15, 2) NOT NULL,
    tax_amount NUMERIC(15, 2) NOT NULL,
    total_amount NUMERIC(15, 2) NOT NULL,
    paid_amount NUMERIC(15, 2) DEFAULT 0.00,
    payment_status VARCHAR(20) DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Partially Paid', 'Paid', 'Overdue')),
    due_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES company_branches(id),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary NUMERIC(15, 2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'On Leave', 'Resigned', 'Suspended')),
    joining_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES employees(id),
    employee_name VARCHAR(255) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    clock_in TIMESTAMPTZ DEFAULT NOW(),
    clock_out TIMESTAMPTZ,
    status VARCHAR(20) DEFAULT 'Present' CHECK (status IN ('Present', 'Half Day', 'Late', 'Absent')),
    location_lat NUMERIC(10, 7),
    location_lng NUMERIC(10, 7),
    is_geofence_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;

-- Helper RLS tenant check function
CREATE OR REPLACE FUNCTION current_company_id() RETURNS UUID AS $$
BEGIN
    RETURN (SELECT company_id FROM user_profiles WHERE id = auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop Policies if exist
DROP POLICY IF EXISTS company_isolation_user_profiles ON user_profiles;
DROP POLICY IF EXISTS company_isolation_customers ON customers;
DROP POLICY IF EXISTS company_isolation_suppliers ON suppliers;
DROP POLICY IF EXISTS company_isolation_products ON products;
DROP POLICY IF EXISTS company_isolation_warehouses ON warehouses;
DROP POLICY IF EXISTS company_isolation_inventory ON inventory_transactions;

-- Multi-Tenant RLS Policies
CREATE POLICY company_isolation_user_profiles ON user_profiles FOR ALL USING (company_id = current_company_id());
CREATE POLICY company_isolation_customers ON customers FOR ALL USING (company_id = current_company_id());
CREATE POLICY company_isolation_suppliers ON suppliers FOR ALL USING (company_id = current_company_id());
CREATE POLICY company_isolation_products ON products FOR ALL USING (company_id = current_company_id());
CREATE POLICY company_isolation_warehouses ON warehouses FOR ALL USING (company_id = current_company_id());
CREATE POLICY company_isolation_inventory ON inventory_transactions FOR ALL USING (company_id = current_company_id());

-- 6. STOCK UPDATE TRIGGER
CREATE OR REPLACE FUNCTION update_product_stock() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.type IN ('Stock In', 'Return') THEN
        UPDATE products SET current_stock = current_stock + NEW.quantity WHERE id = NEW.product_id;
    ELSIF NEW.type IN ('Stock Out', 'Damage') THEN
        UPDATE products SET current_stock = current_stock - NEW.quantity WHERE id = NEW.product_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_stock ON inventory_transactions;
CREATE TRIGGER trg_update_stock
AFTER INSERT ON inventory_transactions
FOR EACH ROW EXECUTE FUNCTION update_product_stock();

-- 7. SOLE SUPER ADMIN AUTOMATIC PROVISIONING TRIGGER
-- Ensures 'brickserpsoftware@gmail.com' is automatically provisioned as Super Admin when created in auth.users
CREATE OR REPLACE FUNCTION public.handle_super_admin_user() RETURNS TRIGGER AS $$
DECLARE
    platform_company_id UUID;
BEGIN
    IF LOWER(NEW.email) = 'brickserpsoftware@gmail.com' THEN
        -- Check or create master platform company
        SELECT id INTO platform_company_id FROM public.companies WHERE gstin = '27PLATFORM00001' LIMIT 1;
        IF platform_company_id IS NULL THEN
            INSERT INTO public.companies (
                name, gstin, pan, email, phone,
                subscription_plan, subscription_status,
                admin_name, admin_email, max_workers, max_branches
            )
            VALUES (
                'Patterns ERP Cloud Platform Master', '27PLATFORM00001', 'PLATFORM00',
                'brickserpsoftware@gmail.com', '+91 90000 00001',
                'Enterprise', 'Active',
                'Platform Super Admin', 'brickserpsoftware@gmail.com', 9999, 999
            )
            RETURNING id INTO platform_company_id;
        END IF;

        -- Create or update user profile as Super Admin
        INSERT INTO public.user_profiles (
            id, company_id, email, full_name, phone, role,
            designation, department, status, permissions
        )
        VALUES (
            NEW.id,
            platform_company_id,
            NEW.email,
            'Patterns Cloud Super Admin',
            '+91 90000 00001',
            'Super Admin',
            'Sole Platform Owner & Super Admin',
            'Platform Architecture & Licensing',
            'Active',
            '["all"]'::jsonb
        )
        ON CONFLICT (id) DO UPDATE SET 
            role = 'Super Admin',
            status = 'Active',
            permissions = '["all"]'::jsonb;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_on_auth_user_super_admin ON auth.users;
CREATE TRIGGER trg_on_auth_user_super_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_super_admin_user();
