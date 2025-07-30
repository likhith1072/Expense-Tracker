import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(),
  icon:varchar({ length: 255 }),
  createdBy:varchar({ length: 255 }).notNull()
});


export const Expenses=pgTable('expenses',{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(),
  budgetId:integer().references(()=>Budgets.id).notNull(),
  createdAt:varchar({ length: 255 }).notNull()
});