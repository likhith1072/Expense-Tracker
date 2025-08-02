// context/BudgetsContext.tsx
'use client';

import React, { createContext, useContext } from 'react';

export type BudgetsList = {
  id: number;
  name: string;
  amount: number;
  icon?: string | null;
  createdBy: string;
  totalSpent?: number | null;
  totalItem?: number | null;
};

export type ExpensesList = {
  id: number;
  name: string;
  amount: number;
  createdAt: string;
  budgetId: number;
};

type BudgetsContextType = {
  globalBudgetsList: BudgetsList[];
  setGlobalBudgetsList: React.Dispatch<React.SetStateAction<BudgetsList[]>>;

  globalExpensesList: ExpensesList[];
  setGlobalExpensesList: React.Dispatch<React.SetStateAction<ExpensesList[]>>;
};

const BudgetsAndExpensesContext = createContext<BudgetsContextType | null>(null);

export const useContextData = () => {
  const context = useContext(BudgetsAndExpensesContext);
  if (!context) throw new Error('useContextData must be used within BudgetsProvider');
  return context;
};

export default BudgetsAndExpensesContext;
