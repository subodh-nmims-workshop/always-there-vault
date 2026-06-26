const dotenv = require('dotenv');
const postgres = require('postgres');
const path = require('path');

const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

async function reset() {
  try {
    const userId = '0ce83011-3ffa-4d84-a1a5-9cb7036d1e1e';
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    await sql`
      UPDATE heartbeat_configs
      SET missed_count = 0, last_heartbeat = ${twoHoursAgo}, updated_at = NOW()
      WHERE user_id = ${userId};
    `;
    console.log('Heartbeat config reset successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    await sql.end();
  }
}

reset();
