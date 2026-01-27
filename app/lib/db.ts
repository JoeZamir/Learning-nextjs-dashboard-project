// Check if we're in development (local) or production (Vercel)
const isLocal = process.env.NODE_ENV === 'development';

let sql: any;

if (isLocal) {
  // Use Neon serverless for local development
  const { neon } = require('@neondatabase/serverless');
  sql = neon(process.env.DATABASE_URL!);
} else {
  // Use regular postgres for Vercel deployment
  const postgres = require('postgres');
  sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
}

export { sql };
