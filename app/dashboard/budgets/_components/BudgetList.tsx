'use client';
import React from 'react'
import CreateBudget from './CreateBudget';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';
import { useContextData } from '@/context/BudgetsAndExpensesContext';

type BudgetsList = {
  id: number,
  name: string,
  amount: number,
  icon?: string | null,
  createdBy: string,
  totalSpent?: number | null,
  totalItem?: number | null
}

function BudgetList() {

   const { globalBudgetsList, setGlobalBudgetsList, globalExpensesList, setGlobalExpensesList } = useContextData();

 
 

  const { user } = useUser();



  const fetchBudgets = async () => {

    try {
      const response = await fetch(`/api/budgetslist`);
      const data = await response.json();
      setGlobalBudgetsList(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  return (
    <div className='mt-7' >
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        <CreateBudget />
        {globalBudgetsList?.length > 0 ? (
          globalBudgetsList.map((budget) => (
            <BudgetItem key={budget.id} budget={budget} />
          ))
        ) : (
          [1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[140px] animate-pulse '></div>
          ))
        )}
      </div>

    </div>
  )
}

export default BudgetList;
