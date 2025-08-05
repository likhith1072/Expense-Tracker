'use client'
import React, {  useState } from 'react'
import { useUser } from '@clerk/nextjs';
import ExpensesListTable from './_components/ExpensesListTable';
import { useContextData } from '@/context/BudgetsAndExpensesContext';

type ExpensesList = {
  id: number,
  name: string,
  amount: number,
  createdAt: string,
  budgetId: number
}

function Expenses() {
  const { globalBudgetsList, setGlobalBudgetsList, globalExpensesList, setGlobalExpensesList } = useContextData();

  const { user } = useUser();
  const [expensesList, setExpensesList] = useState<ExpensesList[] | null>(null);


  const fetchExpenses = async () => {
    try {
      const response = await fetch(`/api/expenseslist`);
      const data = await response.json();
      setExpensesList(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }
  return (
    <div>

      <ExpensesListTable expensesList={globalExpensesList} refreshData={() => { fetchExpenses() }} />
    </div>
  )
}

export default Expenses;
