import { Expenses } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/src/index";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { expenseId } = body;

        if (!expenseId) {
            return NextResponse.json({ error: 'Expense ID is required' }, { status: 400 });
        }

        // Delete the expense with the given ID
        const result = await db.delete(Expenses).where(eq(Expenses.id, expenseId)).returning();

        if (result.length === 0) {
            return NextResponse.json({ error: 'Expense not found or already deleted' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}