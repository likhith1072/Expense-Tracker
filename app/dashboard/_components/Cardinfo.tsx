import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'


type BudgetsList = {
  id: number,
  name: string,
  amount: number,
  icon?: string | null,
  createdBy: string,
  totalSpent?: number | null,
  totalItem?: number | null
}


function Cardinfo({budgetsList}:{budgetsList:BudgetsList[]|null}) {

    const [totalBudget,setTotalBudget]=useState<number>(0);
    const[totalSpent,setTotalSpent]=useState<number>(0);

    useEffect(()=>{
        CalculateCardInfo();
    },[budgetsList])

    const CalculateCardInfo = () => {
        let totalBudget_=0;
        let totalSpent_=0;
        if(!budgetsList) return;
        budgetsList.forEach(element => {
            totalBudget_ = totalBudget_ +element.amount ;
            totalSpent_ = totalSpent_ +element.totalSpent!;
        })
        setTotalBudget(totalBudget_);
        setTotalSpent(totalSpent_);

    }
  return (
    <div>
    
    {budgetsList?<div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
      <div className=' p-7 border rounded-lg flex items-center justify-between'>
        <div>
            <h2 className='text-sm'>Total Budget</h2>
            <h2 className='font-bold text-2xl'>${totalBudget}</h2>     
        </div>
        <PiggyBank className='w-10 h-10 p-2 bg-blue-600 text-white mt-2 rounded-full' />
      </div>
      <div className=' p-7 border rounded-lg flex items-center justify-between'>
        <div>
            <h2 className='text-sm'>Total Spent</h2>
            <h2 className='font-bold text-2xl'>${totalSpent}</h2>     
        </div>
        <ReceiptText className='w-10 h-10 p-2 bg-blue-600 text-white mt-2 rounded-full' />
      </div>
      <div className=' p-7 border rounded-lg flex items-center justify-between'>
        <div>
            <h2 className='text-sm'>No. of Budgets</h2>
            <h2 className='font-bold text-2xl'>{budgetsList?.length??0}</h2>     
        </div>
        <Wallet className='w-10 h-10 p-2 bg-blue-600 text-white mt-2 rounded-full' />
      </div>
      </div>:(
      <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>{
        [1,2,3].map((item,index)=>(
            <div key={index} className='h-[160px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
        ))}</div>
        )}
    </div>
  )
}

export default Cardinfo
