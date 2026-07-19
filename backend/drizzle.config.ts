import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

let databaseUrl = process.env.DATABASE_URL || '';
const isProduction = process.env.NODE_ENV === 'production' || databaseUrl.includes('neon.tech') || databaseUrl.includes('render.com');
if (isProduction && databaseUrl && !databaseUrl.includes('sslmode')) {
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
