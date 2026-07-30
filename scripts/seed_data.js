import pg from 'pg';
const { Client } = pg;

const connectionString = 'postgresql://postgres:Patterns%40ostpc1@db.udoyesvnmuksmclgzomf.supabase.co:5432/postgres';

async function seedData() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase PostgreSQL database for seeding...');
    await client.connect();

    // 1. Insert Company
    const compRes = await client.query(`
      INSERT INTO companies (name, gstin, pan, email, phone, website, logo_url, address, bank_details)
      VALUES (
        'Apex Construction Materials & Aggregates Pvt Ltd',
        '27AAACA12341Z5',
        'AAACA12341',
        'operations@apexmaterials.com',
        '+91 98765 43210',
        'https://apexmaterials.com',
        '/assets/logo.png',
        '{"street":"Plot 45-B, MIDC Industrial Zone", "city":"Mumbai", "state":"Maharashtra", "pincode":"400072", "country":"India"}'::jsonb,
        '{"bank_name":"HDFC Bank Ltd", "account_number":"50200049182310", "ifsc":"HDFC0000123", "branch":"Andheri East, Mumbai"}'::jsonb
      )
      ON CONFLICT (gstin) DO UPDATE SET name = EXCLUDED.name
      RETURNING id;
    `);

    const companyId = compRes.rows[0].id;
    console.log('Company seeded with ID:', companyId);

    // 2. Insert Branch
    const branchRes = await client.query(`
      INSERT INTO company_branches (company_id, name, code, gstin, address, city, state, is_headquarters, phone, email)
      VALUES ($1, 'Mumbai Central Plant (HQ)', 'MUM-01', '27AAACA12341Z5', 'Plot 45-B, MIDC Industrial Zone, Andheri East', 'Mumbai', 'Maharashtra', true, '+91 98200 11223', 'mumbai@apexmaterials.com')
      RETURNING id;
    `, [companyId]);

    console.log('Branch seeded with ID:', branchRes.rows[0].id);

    // 3. Insert Products
    await client.query(`
      INSERT INTO products (company_id, sku, barcode, name, category, brand, unit, hsn_code, gst_rate, purchase_price, selling_price, opening_stock, current_stock, minimum_stock)
      VALUES 
      ($1, 'TMT-12MM-550D', '8901234567890', 'TMT Steel Thermo-Mechanically Treated Bars (12mm Fe550D)', 'Steel', 'Tata Tiscon', 'MT', '72142090', 18, 54000, 63000, 100, 18, 25),
      ($1, 'RMC-M30-STD', '8901234567891', 'Ready Mix Concrete M30 Grade (High Workability)', 'Concrete', 'Apex RMC', 'CuM', '38245010', 18, 3600, 4500, 500, 850, 100),
      ($1, 'CEM-OPC-53', '8901234567892', 'UltraTech OPC 53 Grade Ordinary Portland Cement (50kg Bag)', 'Cement', 'UltraTech', 'Bags', '25232910', 28, 330, 390, 1000, 120, 200)
      ON CONFLICT (company_id, sku) DO NOTHING;
    `, [companyId]);

    console.log('Products seeded successfully.');

    // 4. Insert Customers
    await client.query(`
      INSERT INTO customers (company_id, name, contact_person, email, phone, gstin, pan, credit_limit, current_outstanding, payment_terms_days, category, address, city, state, pincode)
      VALUES 
      ($1, 'Larsen & Toubro Ltd (L&T Construction)', 'Er. Rajesh Varma', 'r.varma@intecc.com', '+91 98200 55443', '27AAACL1234F1Z1', 'AAACL1234F', 10000000, 4520000, 45, 'Contractor', 'L&T House, Ballard Estate', 'Mumbai', 'Maharashtra', '400001'),
      ($1, 'Shapoorji Pallonji Real Estate', 'Anil Deshmukh', 'anil.d@shapoorji.com', '+91 98333 11224', '27AAACS9876K1Z9', 'AAACS9876K', 5000000, 2850000, 30, 'Developer', 'SP Centre, 41/44 Minoo Desai Marg', 'Mumbai', 'Maharashtra', '400005');
    `, [companyId]);

    console.log('Customers seeded successfully.');

  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await client.end();
  }
}

seedData();
