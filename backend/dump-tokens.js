const dotenv = require('dotenv');
const postgres = require('postgres');
const path = require('path');

const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

async function dump() {
  try {
    const tokens = await sql`SELECT * FROM verification_tokens;`;
    console.log('=== VERIFICATION TOKENS ===');
    console.log(JSON.stringify(tokens, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

dump();
