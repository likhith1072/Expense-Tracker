// context/ClientContextProvider.tsx
'use client';

import React, { useState } from "react";
import BudgetsAndExpensesContext, {
  BudgetsList,
  ExpensesList,
} from "./BudgetsAndExpensesContext";

const ClientContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalBudgetsList, setGlobalBudgetsList] = useState<BudgetsList[]>([]);
  const [globalExpensesList, setGlobalExpensesList] = useState<ExpensesList[]>([]);

  return (
    <BudgetsAndExpensesContext.Provider
      value={{
        globalBudgetsList,
        setGlobalBudgetsList,
        globalExpensesList,
        setGlobalExpensesList,
      }}
    >
      {children}
    </BudgetsAndExpensesContext.Provider>
  );
};

export default ClientContextProvider;
