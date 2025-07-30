
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/src/index';
import { Budgets } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  const budgets = await db.select().from(Budgets).where(eq(Budgets.createdBy, email!));
  return NextResponse.json(budgets);
}
