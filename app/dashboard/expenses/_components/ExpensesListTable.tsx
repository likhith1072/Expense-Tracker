import React from 'react'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

type ExpensesList ={
  id:number,
  name:string,
  amount:number,
  createdAt:string,
}

function ExpensesListTable({ expensesList ,refreshData }: { expensesList: ExpensesList[]|null ,refreshData(): void }) {

    const deleteExpense=async(expense: ExpensesList)=>{
        const res = await fetch(`/api/deleteexpense`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },body: JSON.stringify({ expenseId: expense.id }),
        });

        if (!res.ok) {
            throw new Error('Failed to delete expense');
        }
        refreshData();
        toast.success('Expense deleted successfully');

    }
  return (
    <div className='border rounded-lg p-5 mt-5'>
      <h2 className='font-bold text-xl p-2 text-center'>Your Latest Expenses</h2>
      {expensesList ?
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/4 pt-4 pl-4 text-left">Name</th>
            <th className="w-1/4 pt-4 pl-4 text-left">Amount</th>
            <th className="w-1/4 pt-4 pl-4 text-left">Date</th>
            <th className="w-1/4 pt-4 pl-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {expensesList.map((expense) => (
            <tr key={expense.id} className='py-5 pl-4'>
              <td className='py-5 pl-4'>{expense.name}</td>
              <td className='py-5 pl-4'>{expense.amount}</td>
              <td className='py-5 pl-4'>{expense.createdAt}</td>
              <td className='py-5 pl-4'><Dialog>
                      <DialogTrigger asChild><Trash className='w-6 h-6 cursor-pointer p-1 text-red-500
                   hover:text-red-700' />
                   </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className='text-center text-2xl'>Delete Expense</DialogTitle>
                          <DialogDescription className='text-center text-md'>
                            Are you sure you want to delete this expense?
                          </DialogDescription>
              
                        </DialogHeader>
                       
                        <DialogFooter className='sm:justify-between mx-5 '>
                          <DialogClose asChild >
                          <div><Button className='cursor-pointer bg-red-600 hover:bg-red-700 font-semibold' >No</Button></div>
                           
                          </DialogClose>

                          <DialogClose asChild>
                            <div> <Button className='cursor-pointer bg-red-600 hover:bg-red-700 font-semibold' onClick={()=>{deleteExpense(expense);}}>Yes,Delete</Button></div>
                           
                          </DialogClose>
                          
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      :(
      <div>{ [1,2,3,4,5,6,7,8].map((item,index)=>(
        <div className='bg-slate-200 animate-pulse h-[50px] rounded-lg w-full mb-2' key={index}></div>
      ))}</div>
      )}
    </div>
  )
}

export default ExpensesListTable
