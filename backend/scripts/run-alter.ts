import { db } from '../src/db';
import { sql } from 'drizzle-orm';

async function main() {
    try {
        console.log("Running SQL migrations...");
        await db.execute(sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "recovery_address" varchar(42) UNIQUE;`);
        console.log("Migrations completed successfully!");
        process.exit(0);
    } catch (e: any) {
        console.error("Migration failed:", e.message);
        process.exit(1);
    }
}
main();
