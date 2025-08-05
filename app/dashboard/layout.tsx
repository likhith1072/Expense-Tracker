'use client'
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useContextData } from '@/context/BudgetsAndExpensesContext';


type DashboardLayoutProps = {
    children: React.ReactNode;
};


function DashboardLayout({ children }: DashboardLayoutProps) {

    const router=useRouter();
   
  
 const { globalBudgetsList, setGlobalBudgetsList, globalExpensesList, setGlobalExpensesList } = useContextData();
    const { user } = useUser();
 
     useEffect(() => {
    // Fetch budgets from API
    user && fetchBudgets();

  }, [user]);


 

      const fetchBudgets = async () => {

    try {
      const response = await fetch(`/api/budgetslist`,{
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
      const response = await fetch(`/api/expenseslist`);
      const data = await response.json();
    //   setExpensesList(data);
      setGlobalExpensesList(data); // Update global state
      console.log(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }


    return (
        <div className='grid grid-cols-4 lg:grid-cols-5'>
            <div className='col-span-1  hidden md:block sticky top-0 h-screen'>
                <SideNav />
            </div>
            <div className=' md:col-span-3 col-span-4 lg:col-span-4 '>
                <DashboardHeader />

             
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout