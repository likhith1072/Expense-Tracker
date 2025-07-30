// app/api/budgets/route.ts
import { db } from '@/src/index';
import { Budgets } from '@/src/db/schema';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';



export async function PUT(request: Request) {
    try {
        const user = await currentUser();
        const email = user?.emailAddresses?.[0]?.emailAddress;
        const body = await request.json();
        const { budgetId, name, amount, emoji } = body;

        if (!amount || !name || !email || !budgetId) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const result = await db.update(Budgets).set({
            name,
            amount,
            icon: emoji,
        }).where(eq(Budgets.id, budgetId)).returning({ updatedId: Budgets.id });
        if (result.length === 0) {
            return NextResponse.json({ error: "Budget not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Updated", success: true, id: result[0].updatedId });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
