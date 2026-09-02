import pg from 'pg';
const { Client } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Hanuman%401988%402026@db.ebgkooaqhconffelrwlx.supabase.co:5432/postgres';

async function setupDatabaseFullDynamic() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to live Supabase PostgreSQL database...');
    await client.connect();

    // 1. Create all missing tables if any
    console.log('Ensuring all tables exist...');
    await client.query(`
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
        subscription_status VARCHAR(50) DEFAULT 'Active',
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
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
        branch_id UUID REFERENCES company_branches(id) ON DELETE SET NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role VARCHAR(50) NOT NULL DEFAULT 'End User',
        avatar_url TEXT,
        department VARCHAR(100),
        designation VARCHAR(100),
        status VARCHAR(20) DEFAULT 'Active',
        permissions JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS customers (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        gstin VARCHAR(15) NOT NULL,
        pan VARCHAR(10) NOT NULL,
        credit_limit NUMERIC(15, 2) DEFAULT 0.00,
        current_outstanding NUMERIC(15, 2) DEFAULT 0.00,
        payment_terms_days INT DEFAULT 30,
        category VARCHAR(50) DEFAULT 'Contractor',
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        pincode VARCHAR(10) NOT NULL,
        status VARCHAR(20) DEFAULT 'Active',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS suppliers (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        gstin VARCHAR(15) NOT NULL,
        pan VARCHAR(10) NOT NULL,
        categories JSONB DEFAULT '[]'::jsonb,
        outstanding_balance NUMERIC(15, 2) DEFAULT 0.00,
        rating INT DEFAULT 5,
        address TEXT NOT NULL,
        bank_name VARCHAR(255),
        account_number VARCHAR(50),
        ifsc VARCHAR(20),
        status VARCHAR(20) DEFAULT 'Active',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        sku VARCHAR(100) NOT NULL,
        barcode VARCHAR(100),
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        unit VARCHAR(20) NOT NULL,
        hsn_code VARCHAR(20) NOT NULL,
        gst_rate NUMERIC(5, 2) DEFAULT 18.00,
        purchase_price NUMERIC(15, 2) NOT NULL,
        selling_price NUMERIC(15, 2) NOT NULL,
        opening_stock NUMERIC(15, 2) DEFAULT 0.00,
        current_stock NUMERIC(15, 2) DEFAULT 0.00,
        minimum_stock NUMERIC(15, 2) DEFAULT 0.00,
        image_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(company_id, sku)
      );

      CREATE TABLE IF NOT EXISTS warehouses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(50) NOT NULL,
        location TEXT NOT NULL,
        capacity_sqft NUMERIC(10, 2) DEFAULT 0.00,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS inventory_transactions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        warehouse_id UUID REFERENCES warehouses(id),
        type VARCHAR(50) NOT NULL,
        quantity NUMERIC(15, 2) NOT NULL,
        reference_no VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS employees (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        branch_id UUID REFERENCES company_branches(id),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(50) NOT NULL,
        department VARCHAR(100) NOT NULL,
        designation VARCHAR(100) NOT NULL,
        salary_monthly NUMERIC(15, 2) DEFAULT 0.00,
        status VARCHAR(20) DEFAULT 'Active',
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
        status VARCHAR(20) DEFAULT 'Present',
        location_lat NUMERIC(10, 7),
        location_lng NUMERIC(10, 7),
        is_geofence_verified BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 2. Open up RLS policies so all tables are accessible by the frontend API
    console.log('Enabling full dynamic access policies on all tables...');
    const tables = [
      'companies',
      'company_branches',
      'user_profiles',
      'customers',
      'suppliers',
      'products',
      'warehouses',
      'inventory_transactions',
      'employees',
      'attendance_records'
    ];

    for (const table of tables) {
      await client.query(`
        ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY;
        DROP POLICY IF EXISTS "Allow all on ${table}" ON ${table};
        CREATE POLICY "Allow all on ${table}" ON ${table} FOR ALL USING (true) WITH CHECK (true);
      `);
      console.log(`Configured RLS policy for table: ${table}`);
    }

    // 3. Seed sample data for all companies
    console.log('Seeding products, customers, suppliers for all companies...');
    const companiesRes = await client.query("SELECT id, name FROM companies WHERE gstin != '27PLATFORM00001'");
    for (const comp of companiesRes.rows) {
      // Products
      await client.query(`
        INSERT INTO products (company_id, sku, barcode, name, category, brand, unit, hsn_code, gst_rate, purchase_price, selling_price, opening_stock, current_stock, minimum_stock)
        VALUES 
        ($1, 'TMT-12MM-550D', '8901234567890', 'TMT Steel Thermo-Mechanically Treated Bars (12mm Fe550D)', 'Steel', 'Tata Tiscon', 'MT', '72142090', 18, 54000, 63000, 100, 48, 25),
        ($1, 'RMC-M30-STD', '8901234567891', 'Ready Mix Concrete M30 Grade (High Workability)', 'Concrete', 'Apex RMC', 'CuM', '38245010', 18, 3600, 4500, 500, 850, 100),
        ($1, 'CEM-OPC-53', '8901234567892', 'UltraTech OPC 53 Grade Ordinary Portland Cement (50kg Bag)', 'Cement', 'UltraTech', 'Bags', '25232910', 28, 330, 390, 1000, 420, 200),
        ($1, 'FLY-ASH-BRICK', '8901234567893', 'High Strength Fly Ash Heavy Bricks (230x110x75mm)', 'Bricks', 'EcoBrick', 'Pieces', '68159910', 5, 4.5, 7.2, 50000, 34000, 10000)
        ON CONFLICT (company_id, sku) DO NOTHING;
      `, [comp.id]);

      // Customers
      await client.query(`
        INSERT INTO customers (company_id, name, contact_person, email, phone, gstin, pan, credit_limit, current_outstanding, payment_terms_days, category, address, city, state, pincode)
        VALUES 
        ($1, 'Larsen & Toubro Ltd (L&T Construction)', 'Er. Rajesh Varma', 'r.varma@intecc.com', '+91 98200 55443', '27AAACL1234F1Z1', 'AAACL1234F', 10000000, 4520000, 45, 'Contractor', 'L&T House, Ballard Estate', 'Mumbai', 'Maharashtra', '400001'),
        ($1, 'Shapoorji Pallonji Real Estate', 'Anil Deshmukh', 'anil.d@shapoorji.com', '+91 98333 11224', '27AAACS9876K1Z9', 'AAACS9876K', 5000000, 2850000, 30, 'Developer', 'SP Centre, 41/44 Minoo Desai Marg', 'Mumbai', 'Maharashtra', '400005')
        ON CONFLICT DO NOTHING;
      `, [comp.id]);

      // Suppliers
      await client.query(`
        INSERT INTO suppliers (company_id, name, contact_person, email, phone, gstin, pan, categories, outstanding_balance, rating, address, bank_name, account_number, ifsc)
        VALUES 
        ($1, 'Tata Steel Limited (B2B Aggregates)', 'Mahesh Nair', 'supply@tatasteel.com', '+91 98200 88991', '27AAACT0001Z1', 'AAACT0001Z', ARRAY['Steel','Aggregates'], 1250000, 5, 'Bombay House, Homi Mody Street', 'State Bank of India', '302010101010', 'SBIN0000123'),
        ($1, 'UltraTech Cement Ltd (Bulk Logistics)', 'Ravi Shankar', 'orders@ultratech.com', '+91 98200 77662', '27AAACU0002Z2', 'AAACU0002Z', ARRAY['Cement'], 840000, 5, 'Ahura Centre, Mahakali Caves Road', 'HDFC Bank', '50200012345678', 'HDFC0000123')
        ON CONFLICT DO NOTHING;
      `, [comp.id]);
    }

    console.log('✅ Entire Supabase PostgreSQL database is now 100% dynamically set up with live data and accessible!');

  } catch (err) {
    console.error('Setup error:', err);
  } finally {
    await client.end();
  }
}

setupDatabaseFullDynamic();
