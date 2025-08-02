// app/api/budgets/route.ts
import { db } from '@/src/index';
import { Budgets } from '@/src/db/schema';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';


export async function POST(request: Request) {
  try {
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;
    const body = await request.json();
    const { name, amount, emoji } = body;

    if (!amount || !name || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const result = await db.insert(Budgets).values({
        name,
        amount,
        createdBy: email,
        icon: emoji,
    }).returning();

     const newBudget = {
      ...result[0],
      totalSpent: 0,
      totalItem: 0,
    };

    if (!result) {
      return NextResponse.json({ error: 'Failed to create budget' }, { status: 500 });
    }

    return NextResponse.json(newBudget);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
