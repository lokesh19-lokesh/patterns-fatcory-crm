import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Client } = pg;

const connectionString = 'postgresql://postgres:Patterns%40ostpc1@db.udoyesvnmuksmclgzomf.supabase.co:5432/postgres';

async function runMigration() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to live Supabase PostgreSQL database...');
    await client.connect();
    console.log('Connected successfully!');

    const sqlPath = path.resolve('./supabase/migrations/01_initial_schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Executing 01_initial_schema.sql...');
    await client.query(sql);
    console.log('Migration completed successfully! All 17 tables, RLS policies & triggers created.');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await client.end();
  }
}

runMigration();
