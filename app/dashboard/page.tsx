'use client'
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from "@clerk/nextjs";
import Cardinfo from './_components/Cardinfo';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpensesListTable from './expenses/_components/ExpensesListTable';
import { useRouter } from 'next/navigation';
import { useContextData } from '@/context/BudgetsAndExpensesContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type BudgetsList =                 {
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
  budgetId: number
}

function Dashboard() {
    const { globalBudgetsList, setGlobalBudgetsList, globalExpensesList, setGlobalExpensesList } = useContextData();

    useEffect(() => {
  if (globalBudgetsList) {
    setBudgetsList(globalBudgetsList.slice(0, 5));
    
  }

  if(globalExpensesList){
    setExpensesList(globalExpensesList.slice(0,7));
  }

}, [globalBudgetsList,globalExpensesList]);


  const router = useRouter();
  const { user } = useUser();
  const [budgetsList, setBudgetsList] = useState<BudgetsList[] | null>(null);
  const [expensesList, setExpensesList] =
    useState<ExpensesList[] | null>(null);

 
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

    // setBudgetsList(data);
    setGlobalBudgetsList(data); // Update global state
    fetchExpenses();
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`/api/expenseslist?limit=7`);
      const data = await response.json();
      // setExpensesList(data);
      setGlobalExpensesList(data); // Update global state
      console.log(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }


  return (
    <div className='p-8 '>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName}</h2>
      <p className='text-gray-500'>Here's what happening with your money, Lets Manage your expense </p>
      <Cardinfo budgetsList={globalBudgetsList} />

      <div className='grid grid-col-1 lg:grid-cols-3 gap-5 mt-5'>
        <div className='lg:col-span-2 '>
          <BarChartDashboard budgetsList={globalBudgetsList} />
          <div className='border rounded-lg p-2 mt-5'>
          <ExpensesListTable expensesList={expensesList} refreshData={() => { fetchBudgets() }} />
            <div className='flex justify-center items-center bg-blue-50 p-2 rounded-lg'>
          <Link href='/dashboard/expenses' className='text-blue-500 hover:underline hover:text-blue-600  flex items-center'>View All Expenses <ArrowRight /></Link>
          
          </div>
            </div>
        </div>
        <div className='border p-2 rounded-lg'>
          <h2 className='font-bold text-lg text-center my-2'>Latest Budgets</h2>
          {budgetsList?.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
          <div className='flex justify-center items-center mt-2 bg-blue-50 p-2 rounded-lg'>
          <Link href='/dashboard/budgets' className='text-blue-500 hover:underline hover:text-blue-600  flex items-center'>View All Budgets <ArrowRight /></Link>
          
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Dashboard

