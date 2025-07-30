import React from 'react'
import Link from 'next/link';

type BudgetsList = {
    id: number,
    name: string,
    amount: number,
    icon?: string | null,
    createdBy: string,
    totalSpent?: number | null,
    totalItem?: number | null
}

function BudgetItem({ budget }: { budget: BudgetsList }) {
    const calculateProgressPerc=()=>{
        const perc= budget.totalSpent ? (budget.totalSpent / budget.amount) * 100 : 0;
        return perc.toFixed(2);
    }
    return (
       
        <Link href={'/dashboard/expenses/'+budget?.id}>
            <div  className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px] overflow-auto mt-3 '>
            <div className='flex gap-2 items-center'>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>{budget?.icon}</h2>
                    <div>
                        <h2 className='font-bold'>{budget?.name}</h2>
                        <h2 className='text-sm text-gray-400'>{budget.totalItem} Item</h2>
                    </div>

                </div>
                <h2 className='font-bold text-blue-600 text-lg'>$ {budget.amount}</h2>
            </div>
            <div className='mt-5 w-full'>
                <div className='flex justify-between items-center mb-2 '>
                    <h2 className='text-slate-600 text-sm'>$ {budget.totalSpent ? budget.totalSpent : 0} Spend</h2>
                    <h2 className='text-slate-600 text-sm'>$ {budget.totalSpent ? budget.amount-budget.totalSpent : budget.amount} Remaining</h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div className='bg-blue-600 h-2 rounded-full' style={{ width: calculateProgressPerc() + '%' }}>
                    </div>
                </div>
            </div>
           </div>
        </Link>
    )
}

export default BudgetItem
