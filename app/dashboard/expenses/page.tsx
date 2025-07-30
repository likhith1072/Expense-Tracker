'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import ExpensesListTable from './_components/ExpensesListTable';

type ExpensesList = {
  id: number,
  name: string,
  amount: number,
  createdAt: string,
}

function page() {

    const { user } = useUser();
    const [expensesList, setExpensesList] = useState<ExpensesList[] | null>(null);

     useEffect(() => {
         // Fetch expenses from API
         user && fetchExpenses();

       }, [user]);

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
        <h2 className='font-bold text-2xl p-2 text-center'>Your Latest Expenses</h2>
       <ExpensesListTable expensesList={expensesList} refreshData={() => { fetchExpenses() }} />
    </div>
  )
}

export default page
