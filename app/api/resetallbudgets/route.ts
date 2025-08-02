// app/api/budgets/route.ts
import { db } from '@/src/index';
import { Budgets,Expenses } from '@/src/db/schema';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { eq, inArray } from 'drizzle-orm';

export async function POST() {
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;
  try {
    // Delete all expenses
      // Step 1: Get user's budget IDs
    const userBudgets = await db
      .select({ id: Budgets.id })
      .from(Budgets)
      .where(eq(Budgets.createdBy, email!));

    const userBudgetIds = userBudgets.map(b => b.id);
    if (userBudgetIds.length === 0) {
      return NextResponse.json({ updatedBudgets: [] });
    }

    // Step 2: Delete expenses linked to those budgets
    await db
      .delete(Expenses)
      .where(inArray(Expenses.budgetId, userBudgetIds));

    // Step 3: Update those budgets' amount to 0
   const updatedBudgets =await db
      .update(Budgets)
      .set({ amount: 0 })
      .where(eq(Budgets.createdBy, email!)).returning();

   

    return NextResponse.json(updatedBudgets);
  } catch (error) {
    console.error('Reset error:', error);
    return NextResponse.json({ error: 'Failed to reset all budgets' }, { status: 500 });
  }
}
