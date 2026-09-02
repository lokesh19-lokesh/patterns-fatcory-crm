import pg from 'pg';
const { Client } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Hanuman%401988%402026@db.ebgkooaqhconffelrwlx.supabase.co:5432/postgres';

async function seedAllCompaniesToDatabase() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase PostgreSQL database...');
    await client.connect();

    // 1. Enable full access RLS policy on companies table so the frontend API can read and update it
    console.log('Configuring companies RLS policies...');
    await client.query(`
      DROP POLICY IF EXISTS "Allow select companies" ON companies;
      CREATE POLICY "Allow select companies" ON companies FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Allow insert companies" ON companies;
      CREATE POLICY "Allow insert companies" ON companies FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Allow update companies" ON companies;
      CREATE POLICY "Allow update companies" ON companies FOR UPDATE USING (true);

      DROP POLICY IF EXISTS "Allow delete companies" ON companies;
      CREATE POLICY "Allow delete companies" ON companies FOR DELETE USING (true);
    `);

    // 2. Insert all companies into companies table
    console.log('Inserting tenant companies into Supabase "companies" table...');

    const companies = [
      {
        name: 'Apex Construction Materials & Aggregates Pvt Ltd',
        gstin: '27AAACA12341Z5',
        pan: 'AAACA12341',
        email: 'operations@apexmaterials.com',
        phone: '+91 98765 43210',
        website: 'https://apexmaterials.com',
        logo_url: '/assets/logo.png',
        address: JSON.stringify({
          street: 'Industrial Zone, Plot 45-B',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400072',
          country: 'India'
        }),
        bank_details: JSON.stringify({
          bank_name: 'HDFC Bank Ltd',
          account_number: '50200049182310',
          ifsc: 'HDFC0000123',
          branch: 'Andheri East, Mumbai'
        }),
        subscription_plan: 'Enterprise',
        subscription_status: 'Active',
        subscription_expires_at: '2027-09-01T23:59:59Z',
        subscription_price: 49999,
        billing_cycle: 'Annual',
        max_workers: 100,
        max_branches: 15,
        admin_name: 'Vikramaditya Sharma',
        admin_email: 'admin@apexmaterials.com'
      },
      {
        name: 'Bharath Eco-Bricks & Pavers Ltd',
        gstin: '29BBBCB98762Z1',
        pan: 'BBBCB98762',
        email: 'contact@bharathecobricks.in',
        phone: '+91 98450 11223',
        website: 'https://bharathecobricks.in',
        address: JSON.stringify({
          street: 'Peenya Industrial Area, Phase III',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560058',
          country: 'India'
        }),
        bank_details: JSON.stringify({
          bank_name: 'State Bank of India',
          account_number: '309988776655',
          ifsc: 'SBIN0001234',
          branch: 'Peenya, Bengaluru'
        }),
        subscription_plan: 'Professional',
        subscription_status: 'Active',
        subscription_expires_at: '2027-03-16T23:59:59Z',
        subscription_price: 24999,
        billing_cycle: 'Annual',
        max_workers: 30,
        max_branches: 5,
        admin_name: 'Kavitha Ramesh',
        admin_email: 'kavitha@bharathecobricks.in'
      },
      {
        name: 'Shanti Ready Mix Concrete & Blocks',
        gstin: '24CCCDC54323Z9',
        pan: 'CCCDC54323',
        email: 'admin@shantirmc.com',
        phone: '+91 98250 88990',
        website: 'https://shantirmc.com',
        address: JSON.stringify({
          street: 'GIDC Industrial Estate, Sector 28',
          city: 'Gandhinagar',
          state: 'Gujarat',
          pincode: '382028',
          country: 'India'
        }),
        bank_details: JSON.stringify({
          bank_name: 'ICICI Bank',
          account_number: '002405001234',
          ifsc: 'ICIC0000024',
          branch: 'Gandhinagar'
        }),
        subscription_plan: 'Starter',
        subscription_status: 'Trial',
        subscription_expires_at: '2026-09-15T23:59:59Z',
        subscription_price: 9999,
        billing_cycle: 'Monthly',
        max_workers: 10,
        max_branches: 2,
        admin_name: 'Hitesh Patel',
        admin_email: 'hitesh@shantirmc.com'
      },
      {
        name: 'Deccan Aggregates & Stone Crusher Plant',
        gstin: '36DDDCD43214Z8',
        pan: 'DDDCD43214',
        email: 'finance@deccanaggregates.com',
        phone: '+91 94400 33221',
        website: 'https://deccanaggregates.com',
        address: JSON.stringify({
          street: 'Nacharam Industrial Area',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500076',
          country: 'India'
        }),
        bank_details: JSON.stringify({
          bank_name: 'Axis Bank',
          account_number: '9180200334455',
          ifsc: 'UTIB0000456',
          branch: 'Secunderabad'
        }),
        subscription_plan: 'Professional',
        subscription_status: 'Suspended',
        subscription_expires_at: '2026-08-01T23:59:59Z',
        subscription_price: 24999,
        billing_cycle: 'Annual',
        max_workers: 30,
        max_branches: 5,
        admin_name: 'Srinivas Reddy',
        admin_email: 'srinivas@deccanaggregates.com'
      }
    ];

    for (const comp of companies) {
      await client.query(`
        INSERT INTO companies (
          name, gstin, pan, email, phone, website, logo_url, address, bank_details,
          subscription_plan, subscription_status, subscription_expires_at, subscription_price,
          billing_cycle, max_workers, max_branches, admin_name, admin_email
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        ON CONFLICT (gstin) DO UPDATE SET
          name = EXCLUDED.name,
          subscription_plan = EXCLUDED.subscription_plan,
          subscription_status = EXCLUDED.subscription_status,
          subscription_expires_at = EXCLUDED.subscription_expires_at,
          subscription_price = EXCLUDED.subscription_price,
          billing_cycle = EXCLUDED.billing_cycle,
          max_workers = EXCLUDED.max_workers,
          max_branches = EXCLUDED.max_branches,
          admin_name = EXCLUDED.admin_name,
          admin_email = EXCLUDED.admin_email,
          address = EXCLUDED.address,
          bank_details = EXCLUDED.bank_details;
      `, [
        comp.name, comp.gstin, comp.pan, comp.email, comp.phone, comp.website || '', comp.logo_url || null,
        comp.address, comp.bank_details, comp.subscription_plan, comp.subscription_status,
        comp.subscription_expires_at, comp.subscription_price, comp.billing_cycle, comp.max_workers,
        comp.max_branches, comp.admin_name, comp.admin_email
      ]);
      console.log(`Inserted / Updated company: ${comp.name}`);
    }

    const countRes = await client.query('SELECT count(*) FROM companies;');
    console.log(`Total companies currently in PostgreSQL database: ${countRes.rows[0].count}`);

  } catch (err) {
    console.error('Error seeding companies:', err);
  } finally {
    await client.end();
  }
}

seedAllCompaniesToDatabase();
