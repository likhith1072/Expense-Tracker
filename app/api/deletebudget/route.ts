import { Budgets, Expenses } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/src/index";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { budgetId } = body;

        if (!budgetId) {
            return NextResponse.json({ error: 'Budget ID is required' }, { status: 400 });
        }

        // Delete the expense with the given ID
        const result = await db.delete(Expenses).where(eq(Expenses.budgetId, budgetId)).returning();

        if(result){
            const deletedBudget =await db.delete(Budgets).where(eq(Budgets.id, budgetId)).returning();
            if (deletedBudget.length === 0) {
                return NextResponse.json({ error: 'Budget not found or already deleted' }, { status: 404 });
            }
        }

        return NextResponse.json({ success: true, message: 'Budget deleted successfully' });
    } catch (error) {
        console.error('Error deleting budget:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}