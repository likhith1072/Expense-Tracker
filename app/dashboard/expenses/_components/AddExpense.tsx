'use client'
import React from 'react'
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react'
import { useContextData } from '@/context/BudgetsAndExpensesContext';


type Expense
    = {
        name: string,
        amount: number,
        budgetId: number
    }
function AddExpense({ id }: { id: string}) {
    const { globalBudgetsList, setGlobalBudgetsList, globalExpensesList, setGlobalExpensesList } = useContextData();
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const expense: Expense = {
        name,
        amount: amount || 0, // Ensure amount is a number, default to 0 if null
        budgetId: Number(id)
    };

    const addNewExpense = async () => {
        setLoading(true);
        const res = await fetch('/api/addexpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });

        if (!res.ok) {
            setLoading(false);
            throw new Error('Failed to add expense');
        }

        const NewExpense = await res.json();

        setGlobalExpensesList((prev) => {
            const updated = [...prev, NewExpense];
            updated.sort((a, b) =>  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            return updated;
        });

        setGlobalBudgetsList((prev) => {
            const index = prev.findIndex(b => b.id === NewExpense.budgetId);
            
            const updated = [...prev]; // safe copy
            const budget= { ...updated[index] }; // Copy the object
            budget.totalSpent = (budget.totalSpent || 0) + NewExpense.amount;
            budget.totalItem = (budget.totalItem || 0) + 1;
            updated[index] = budget; // Replace with updated copy
            return updated;
        });
        setName('');
        setAmount(null);
        // refreshData();
        setLoading(false);
    }



    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input type='text'
                    value={name} placeholder='e.g. Home Decoration' className='mt-1' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input type='number'
                    value={amount !== null ? amount : ''} placeholder='e.g. 1000'
                    className='mt-1' onChange={(e) => setAmount(Number(e.target.value))} />
            </div>
            <Button disabled={!(name && amount) || loading}
                onClick={() => { addNewExpense() }} className='mt-5 w-full cursor-pointer'>
                {loading ? <Loader className='animate-spin' /> : "Add Expense"}</Button>



        </div>
    )
}

export default AddExpense
