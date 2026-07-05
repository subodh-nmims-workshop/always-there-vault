import { db } from '../src/db';
import { files } from '../src/db/schema/files';

async function main() {
    try {
        console.log("Fetching all files in the files table...");
        const allFiles = await db.select().from(files);
        console.log("Total files found:", allFiles.length);
        console.log(JSON.stringify(allFiles, (key, value) => {
            if (key === 'encryptedData' && value) {
                return value.substring(0, 50) + `... (length: ${value.length})`;
            }
            return value;
        }, 2));
        process.exit(0);
    } catch (e: any) {
        console.error("Inspection failed:", e.message);
        process.exit(1);
    }
}
main();
