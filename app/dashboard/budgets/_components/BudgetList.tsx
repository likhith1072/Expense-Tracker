'use client';
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';

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

  const { user } = useUser();
  const [budgetsList, setBudgetsList] = useState<BudgetsList[]>([]);

  useEffect(() => {
    // Fetch budgets from API
    user && fetchBudgets();
  }, [user]);

  const fetchBudgets = async () => {

    try {
      const response = await fetch(`/api/budgetslist`);
      const data = await response.json();
      setBudgetsList(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  return (
    <div className='mt-7' >
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        <CreateBudget refreshData={() => fetchBudgets()} />
        {budgetsList?.length > 0 ? (
          budgetsList.map((budget, index) => (
            <BudgetItem key={index} budget={budget} />
          ))
        ) : (
          [1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[140px] animate-pulse'></div>
          ))
        )}
      </div>

    </div>
  )
}

export default BudgetList;
