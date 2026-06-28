const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log('Connected to DB');
    const res = await client.query('SELECT id, wallet_address, email, pending_email, email_verification_token, email_verified FROM users');
    console.log('Users:');
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error('Error querying db:', err);
  } finally {
    await client.end();
  }
}

main();
