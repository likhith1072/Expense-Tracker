
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/src/index';
import { Budgets } from '@/src/db/schema';
import { Expenses } from '@/src/db/schema';
import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';



export async function GET(req:Request) {
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;
//     const { searchParams } = new URL(req.url);
//   const limit = Number(searchParams.get('limit')) || 6;
//   const offset = Number(searchParams.get('offset')) || 0;

    const expensesList = await db.select({
        id:Expenses.id,
        name:Expenses.name,
        amount:Expenses.amount,
        createdAt:Expenses.createdAt,
        budgetId:Expenses.budgetId
    }).from(Budgets).
        rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId)).where(eq(Budgets.createdBy, email!)).orderBy(desc(Expenses.id));

    return NextResponse.json(expensesList);
}
