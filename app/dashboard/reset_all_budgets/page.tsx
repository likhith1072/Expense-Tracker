'use client'
import React from 'react'
import { toast } from 'sonner'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import {RotateCcw} from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useContextData } from '@/context/BudgetsAndExpensesContext';


function ResetAllBudgets() {

    const router = useRouter();
    const { globalBudgetsList, globalExpensesList,setGlobalExpensesList,setGlobalBudgetsList } = useContextData();

    const ResetAllBudgets = async () => {
        try {
        const response = await fetch(`/api/resetallbudgets`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });
    
        if (!response.ok) {
            throw new Error('Failed to reset budgets');
        }
          const data = await response.json();
    console.log('Updated Budgets:', data.updatedBudgets);
        setGlobalBudgetsList(data);
        setGlobalExpensesList([]);
         
    
        toast.success('All Budgets have been reset successfully!');
        } catch (error) {
        console.error('Error resetting budgets:', error);
        toast.error('Failed to reset budgets. Please try again later.');
        }
    }
  return (
    <div>
      <h1 className='text-2xl font-bold text-center p-4'>Reset All Budgets</h1>
      <p className='text-center font-semibold p-2'>EveryOne sets there Budgets for a specific period of time, Some for Montly and Some for Yearly.</p>
      <p className='text-center font-semibold p-2'> Reset all budgets means to set all the Budgets amount to &quot;0&quot; and Deleting all Expenses ,Your Budgets name, icon will not be removed when you Reset Budgets</p>
      <div className='flex justify-center mt-5'>
       
          <Dialog>
                  <DialogTrigger asChild><Button className='bg-red-500 hover:bg-red-600 cursor-pointer'><RotateCcw className='w-6 h-6 text-white' />Reset</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className='text-center text-xl'>Are you sure, you want to Reset All Budgets?</DialogTitle>
                      <DialogDescription className='text-center text-md'>
                        This action cannot be undone. This will permanently delete All Expenses and reset All your budgets amount to &quot;0&quot;
                        (This will not reset your Budget name and icon).
                      </DialogDescription>
        
                    </DialogHeader>
        
                    <DialogFooter className='sm:justify-between mx-5 '>
                      <DialogClose asChild >
                        <div><Button className='cursor-pointer bg-red-600 hover:bg-red-700 font-semibold' >Cancel</Button></div>
        
                      </DialogClose>
        
                      <DialogClose asChild>
                        <div><Button className='cursor-pointer bg-red-600 hover:bg-red-700 font-semibold' onClick={() => { ResetAllBudgets(); }}>Yes, Reset</Button></div>
        
                      </DialogClose>
        
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
      </div>

    </div>
  )
}

export default ResetAllBudgets;
