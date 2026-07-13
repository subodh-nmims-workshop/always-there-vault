import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

let databaseUrl = process.env.DATABASE_URL || '';
if (databaseUrl && !databaseUrl.includes('sslmode')) {
  databaseUrl += databaseUrl.includes('?') ? '&sslmode=require' : '?sslmode=require';
}

export default {
  schema: './src/db/schema/*',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
  strict: true,
} satisfies Config;
