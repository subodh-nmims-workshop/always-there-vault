const dotenv = require('dotenv');
const postgres = require('postgres');
const path = require('path');

const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

async function dump() {
  try {
    const files = await sql`SELECT * FROM files;`;
    console.log('=== FILES ===');
    console.log(JSON.stringify(files, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

dump();
