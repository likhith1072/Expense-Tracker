'use client'
import React from 'react'
import { useEffect, use, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpensesListTable from '../_components/ExpensesListTable';
import { ArrowLeft, PenBox, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import {useRouter} from 'next/navigation';
import EditBudget from '../_components/EditBudget';
import { useContextData } from '@/context/BudgetsAndExpensesContext';

type BudgetInfo = {
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

function Expenses({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // unwrap the promise with `use`
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<BudgetInfo | null>(null);
  const [expensesList, setExpensesList] = useState<ExpensesList[]|null>(null);
  const router=useRouter();

  const { globalBudgetsList, setGlobalBudgetsList, globalExpensesList, setGlobalExpensesList } = useContextData();


  useEffect(() => {
    if (user) {
      const budget = globalBudgetsList.find(b => b.id === Number(id));
      setBudgetInfo(budget || null);
      const expenses = globalExpensesList.filter(e => e.budgetId === Number(id));
      setExpensesList(expenses || null);
    }
  }, [user, globalBudgetsList, globalExpensesList, id]);

  const getBudgetInfo = async () => {
    try {
      const response = await fetch(`/api/budget`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ budgetId: id }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch budget info');
      }

      const data = await response.json();
      console.log(data);
      setBudgetInfo(data[0]);
    } catch (error) {
      console.error('Error fetching budget info:', error);
    }
  }

  const getExpensesList = async () => {
    try {
      const response = await fetch(`/api/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ budgetId: Number(id) }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch expenses list');
      }

      const data = await response.json();
      setExpensesList(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching expenses list:', error);
    }
  }

  function deleteBudget() {
    if (!budgetInfo) {
      toast.error('No budget information available to delete');
      return;
    }

    fetch(`/api/deletebudget`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ budgetId: budgetInfo.id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete budget');
        }
        setGlobalBudgetsList((prev) => prev.filter(b => b.id !== budgetInfo.id));
        return response.json();
      })
      .then(() => {

        toast.success('Budget deleted successfully');
        router.replace('/dashboard/budgets'); 
        // Optionally, redirect or update UI
      })
      .catch((error) => {
        console.error('Error deleting budget:', error);
        toast.error('Failed to delete budget');
      });
  }

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'><h2 className="text-2xl font-bold flex gap-2 items-center">
        <ArrowLeft onClick={()=>router.back()} className='cursor-pointer text-gray-700 hover:text-gray-900'/> My Expenses</h2>
        <div className='flex gap-2 items-center'>
          <EditBudget budgetInfo={budgetInfo} 
          />
        <Dialog>
          <DialogTrigger asChild><Button className='bg-red-600 hover:bg-red-700 cursor-pointer'><Trash className='w-6 h-6 text-white' />Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-center text-xl'>Are you sure, you want to Delete the Budget?</DialogTitle>
              <DialogDescription className='text-center text-md'>
                This action cannot be undone.This will permanently delete and remove your budget and all associated expenses from our database.
              </DialogDescription>

            </DialogHeader>

            <DialogFooter className='sm:justify-between mx-5 '>
              <DialogClose asChild >
                <div><Button className='cursor-pointer bg-red-600 hover:bg-red-700 font-semibold' >Cancel</Button></div>

              </DialogClose>

              <DialogClose asChild>
                <div> <Button className='cursor-pointer bg-red-600 hover:bg-red-700 font-semibold' onClick={() => { deleteBudget(); }}>Yes,Delete</Button></div>

              </DialogClose>

            </DialogFooter>
          </DialogContent>
        </Dialog></div>

       
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-5'>
        {budgetInfo ? <BudgetItem budget={budgetInfo} /> : <div className='w-full bg-slate-200 rounded-lg h-[140px] animate-pulse'></div>}
        <AddExpense id={id} />
      </div>
      <div className='mt-4 '>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpensesListTable expensesList={expensesList} refreshData={() => {
          getExpensesList();
          getBudgetInfo();
        }} />
      </div>
    </div>
  )
}

export default Expenses
