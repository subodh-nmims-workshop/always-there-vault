const dotenv = require('dotenv');
const postgres = require('postgres');
const path = require('path');

const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

const connectionString = process.env.DATABASE_URL;
console.log('Connecting to:', connectionString);

const sql = postgres(connectionString);

async function dump() {
  try {
    const users = await sql`SELECT * FROM users;`;
    console.log('--- USERS ---');
    console.table(users);

    const configs = await sql`SELECT * FROM heartbeat_configs;`;
    console.log('--- HEARTBEAT CONFIGS ---');
    console.table(configs);

    const beneficiaries = await sql`SELECT * FROM beneficiaries;`;
    console.log('--- BENEFICIARIES ---');
    console.table(beneficiaries);

    const tokens = await sql`SELECT * FROM verification_tokens;`;
    console.log('--- VERIFICATION TOKENS ---');
    console.table(tokens);

  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

dump();
