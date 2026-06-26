const dotenv = require('dotenv');
const postgres = require('postgres');
const path = require('path');

const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

async function reset() {
  try {
    // Set last heartbeat to 3 minutes ago (beyond the 1-min interval + grace)
    // So cron will detect it as overdue and fire notifications
    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
    
    const result = await sql`
      UPDATE heartbeat_configs
      SET missed_count = 0, last_heartbeat = ${threeMinutesAgo}, updated_at = NOW()
    `;
    console.log('✅ All heartbeat configs reset! missed_count=0, last_heartbeat=3min ago');
    console.log('👉 Wait for next cron tick (up to 1 min) — emails should fire!');
  } catch (err) {
    console.error('❌ Reset failed:', err);
  } finally {
    await sql.end();
  }
}

reset();
