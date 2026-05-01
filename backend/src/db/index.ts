import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/relations';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL!;
const isProduction = process.env.NODE_ENV === 'production' || connectionString.includes('neon.tech');

// For migrations
export const migrationClient = postgres(connectionString, { 
    max: 1,
    ssl: isProduction ? 'require' : false 
});

// For queries
const queryClient = postgres(connectionString, {
    ssl: isProduction ? 'require' : false
});
export const db = drizzle(queryClient, { schema });

export default db;
