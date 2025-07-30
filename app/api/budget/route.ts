import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/src/index';
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/src/db/schema';
import { NextResponse } from 'next/server';

export async function POST(request:Request){
    const { budgetId } = await request.json();
    const ID = Number(budgetId);
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    const budget = await db.select({
        ...getTableColumns(Budgets), totalSpent: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets).
        leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId)).where(
            and(
                eq(Budgets.createdBy, email!),
                eq(Budgets.id, ID)
            )
        ).groupBy(Budgets.id).orderBy(desc(Budgets.id));

    return NextResponse.json(budget);

}