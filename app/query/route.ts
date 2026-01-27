import { sql } from '../lib/db';

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  return data;
}

export async function GET() {
  try {
    const result = await listInvoices();
    return Response.json(result);
  } catch (error) {
    console.error('Database query error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

