'use client'
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from "@clerk/nextjs";
import Cardinfo from './_components/Cardinfo';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpensesListTable from './expenses/_components/ExpensesListTable';
import { useRouter } from 'next/navigation';

type BudgetsList = {
  id: number,
  name: string,
  amount: number,
  icon?: string | null,
  createdBy: string,
  totalSpent?: number | null,
  totalItem?: number | null
}

type ExpensesList = {
  id: number,
  name: string,
  amount: number,
  createdAt: string,
}

function Dashboard() {
  const router = useRouter();
  const { user } = useUser();
  const [budgetsList, setBudgetsList] = useState<BudgetsList[] | null>(null);
  const [expensesList, setExpensesList] =
    useState<ExpensesList[] | null>(null);

  useEffect(() => {
    // Fetch budgets from API
    user && fetchBudgets();

  }, [user]);

  const fetchBudgets = async () => {

    try {
      const response = await fetch('/api/budgetslist',{
        credentials: 'include',
      });

      if (!response.ok) {
        console.log(response.ok);
      const text = await response.text(); // 👈 Check server response
      console.error('Failed to fetch budgets:', response.status, text);
      return;
    }

    const data = await response.json();

    if (data?.length === 0) {
      router.replace('/dashboard/budgets');
      return;
    }

    setBudgetsList(data);
    fetchExpenses();
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

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
    <div className='p-8 '>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
      <p className='text-gray-500'>Here's what happening with your money, Lets Manage your expense </p>
      <Cardinfo budgetsList={budgetsList} />

      <div className='grid grid-col-1 lg:grid-cols-3 gap-5 mt-5'>
        <div className='lg:col-span-2 '>
          <BarChartDashboard budgetsList={budgetsList} />
          <ExpensesListTable expensesList={expensesList} refreshData={() => { fetchExpenses() }} />
        </div>
        <div>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetsList?.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

