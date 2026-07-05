import { db } from '../src/db';
import { sql } from 'drizzle-orm';

async function main() {
    try {
        console.log("Inspecting database tables...");
        
        // List all tables
        const tablesResult = await db.execute(sql`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public';
        `);
        console.log("Tables in database:");
        console.log(JSON.stringify(tablesResult, null, 2));

        // Check columns for files table
        const columnsResult = await db.execute(sql`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = 'files';
        `);
        console.log("\nColumns in 'files' table:");
        console.log(JSON.stringify(columnsResult, null, 2));

        process.exit(0);
    } catch (e: any) {
        console.error("Inspection failed:", e.message);
        process.exit(1);
    }
}
main();
