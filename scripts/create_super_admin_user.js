import pg from 'pg';
const { Client } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:Hanuman%401988%402026@db.ebgkooaqhconffelrwlx.supabase.co:5432/postgres';

async function createSuperAdmin() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to Supabase PostgreSQL database...');
    await client.connect();

    // Enable pgcrypto extension
    await client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // 1. Create or get Master Platform Company
    const compRes = await client.query(`
      INSERT INTO companies (name, gstin, pan, email, phone, website, subscription_plan, subscription_status, admin_name, admin_email, max_workers, max_branches)
      VALUES (
        'Patterns ERP Cloud Platform Master',
        '27PLATFORM00001',
        'PLATFORM00',
        'brickserpsoftware@gmail.com',
        '+91 90000 00001',
        'https://patternscloud.com',
        'Enterprise',
        'Active',
        'Platform Super Admin',
        'brickserpsoftware@gmail.com',
        9999,
        999
      )
      ON CONFLICT (gstin) DO UPDATE SET admin_email = EXCLUDED.admin_email
      RETURNING id;
    `);

    const companyId = compRes.rows[0].id;
    console.log('Master Platform Company ID:', companyId);

    // 2. Check if user already exists in auth.users
    const userCheck = await client.query(`
      SELECT id FROM auth.users WHERE email = 'brickserpsoftware@gmail.com' LIMIT 1;
    `);

    let userId;
    if (userCheck.rows.length > 0) {
      userId = userCheck.rows[0].id;
      console.log('User already exists in auth.users with ID:', userId);

      // Update password hash and confirmed_at
      await client.query(`
        UPDATE auth.users
        SET 
          encrypted_password = crypt('Tpc@123', gen_salt('bf')),
          email_confirmed_at = NOW(),
          raw_user_meta_data = '{"full_name":"Patterns Super Admin", "role":"Super Admin"}'::jsonb,
          updated_at = NOW()
        WHERE id = $1;
      `, [userId]);
      console.log('Password updated successfully for brickserpsoftware@gmail.com');
    } else {
      // Insert into auth.users with encrypted password
      const userRes = await client.query(`
        INSERT INTO auth.users (
          instance_id,
          id,
          aud,
          role,
          email,
          encrypted_password,
          email_confirmed_at,
          raw_app_meta_data,
          raw_user_meta_data,
          created_at,
          updated_at,
          confirmation_token
        )
        VALUES (
          '00000000-0000-0000-0000-000000000000',
          uuid_generate_v4(),
          'authenticated',
          'authenticated',
          'brickserpsoftware@gmail.com',
          crypt('Tpc@123', gen_salt('bf')),
          NOW(),
          '{"provider":"email","providers":["email"]}'::jsonb,
          '{"full_name":"Patterns Super Admin", "role":"Super Admin"}'::jsonb,
          NOW(),
          NOW(),
          ''
        )
        RETURNING id;
      `);
      userId = userRes.rows[0].id;
      console.log('Created user in auth.users with ID:', userId);
    }

    // 3. Upsert user_profiles record
    await client.query(`
      INSERT INTO user_profiles (
        id,
        company_id,
        email,
        full_name,
        phone,
        role,
        designation,
        department,
        status,
        permissions
      )
      VALUES (
        $1,
        $2,
        'brickserpsoftware@gmail.com',
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
        permissions = '["all"]'::jsonb,
        company_id = EXCLUDED.company_id;
    `, [userId, companyId]);

    console.log('Super Admin user profile linked successfully!');

  } catch (err) {
    console.error('Error creating super admin user:', err);
  } finally {
    await client.end();
  }
}

createSuperAdmin();
