// app/api/budgets/route.ts
import { db } from '@/src/index';
import { Budgets,Expenses } from '@/src/db/schema';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import moment from 'moment';

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;
    const body = await request.json();
    const { name, amount, budgetId } = body;

    if (!amount || !name || !budgetId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const result = await db.insert(Expenses).values({
        name,
        amount,
        budgetId,
        createdAt: moment().format('DD/MM/YYYY'),
    }).returning({insertedId: Expenses.id});
    if (!result) {
      return NextResponse.json({ error: 'Failed to create budget' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
