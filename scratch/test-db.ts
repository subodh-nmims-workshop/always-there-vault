import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
    const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });
    try {
        const result = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
        console.log('Successfully connected to Neon!');
        console.log('Tables found:', result.map(r => r.table_name).join(', '));
    } catch (err) {
        console.error('Failed to connect to Neon:', err.message);
    } finally {
        await sql.end();
    }
}

testConnection();
