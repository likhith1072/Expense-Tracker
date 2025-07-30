import { Expenses } from "@/src/db/schema";
import { db } from "@/src/index";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";


export async function POST(request:Request){
    const { budgetId } = await request.json();

    if (!budgetId) {
        return NextResponse.json('Budget ID is required', { status: 400 });
    }

    // Fetch expenses for the given budget ID
    const expenses = await db.select().from(Expenses).where(eq(Expenses.budgetId,budgetId)).orderBy(desc(Expenses.createdAt));

    return NextResponse.json(expenses);
}