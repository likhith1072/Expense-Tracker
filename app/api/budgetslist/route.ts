import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/src/index';
import { Budgets, Expenses } from '@/src/db/schema';
import { desc, eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { getTableColumns } from 'drizzle-orm';

export async function GET(req:Request) {
  const user = await currentUser();
  // const {searchParams}=new URL(req.url);
  //  const limit = Number(searchParams.get('limit')) || 6;
  // const offset = Number(searchParams.get('offset')) || 0;

  if (!user) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const email = user.emailAddresses?.[0]?.emailAddress;

  if (!email) {
    return NextResponse.json({ error: 'Email not found' }, { status: 400 });
  }


  const budgetslist = await db
    .select({
      ...getTableColumns(Budgets),
      totalSpent: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    })
    .from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, email)) // Assuming you still use email
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));

  return NextResponse.json(budgetslist);
}
