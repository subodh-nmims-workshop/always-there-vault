const dotenv = require('dotenv');
const postgres = require('postgres');
const path = require('path');

const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

async function dump() {
  try {
    const users = await sql`SELECT * FROM users;`;
    console.log('=== USERS ===');
    console.log(JSON.stringify(users, null, 2));

    const configs = await sql`SELECT * FROM heartbeat_configs;`;
    console.log('=== HEARTBEAT CONFIGS ===');
    console.log(JSON.stringify(configs, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

dump();
