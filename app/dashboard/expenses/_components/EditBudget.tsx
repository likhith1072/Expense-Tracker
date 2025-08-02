'use client'
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react';
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from 'react';
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


type Budget = {
  budgetId?: number,
  name: string,
  amount: number,
  emoji: string
}

function EditBudget({ budgetInfo }: { budgetInfo: BudgetInfo | null}) {

  const { globalBudgetsList, setGlobalBudgetsList } = useContextData();

    useEffect(() => {
  if (budgetInfo) {
    setName(budgetInfo.name);
    setAmount(budgetInfo.amount);
    setEmojiIcon(budgetInfo.icon ?? '😆');
  }
}, [budgetInfo]);

      const [emojiIcon, setEmojiIcon] = useState<string>(budgetInfo?.icon ?? '😆');
    //   budgetInfo?.icon ?? '😆' utilizes optional chaining (?.) to safely access the icon property of the potentially null or undefined budgetInfo object, and applies the nullish coalescing operator (??) to return '😆' as a default value if the result of budgetInfo?.icon is null or undefined, thereby preventing runtime errors and ensuring a defined fallback value.
      const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
    
      const [name, setName] = useState<string>(budgetInfo?.name ?? 'likhith');
      const [amount, setAmount] = useState<number | null>(budgetInfo?.amount ?? null);

      const onUpdateBudget = async () => {
        if (!name || !amount) return;
    
        const budget: Budget = {
         ...(budgetInfo && {budgetId:budgetInfo.id}),
          name,
          amount,
          emoji: emojiIcon,
        };
    
        // Call your API to create the budget
        const res = await fetch('/api/updatebudget', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(budget),
        });
    
        if (!res.ok) {
          console.error('Failed to update budget');
          return;
        }
        const updatedBudget = await res.json();
        setGlobalBudgetsList((prev) => {
          const index = prev.findIndex(b => b.id === updatedBudget.id);
          if (index === -1) return [...prev, updatedBudget];
          const updated = [...prev];
          updated[index] = updatedBudget;
          return updated;
        });
        toast(" Budget has been updated."
        //   ,{
        //   style: {
        //     background: '#a7f3d0',
        //   },
        // }
      )
        // Reset the form
        setEmojiIcon('😆');
        setName('');
        setAmount(null);
      }
    
  return (
    <div>
     
          <Dialog>
              <DialogTrigger asChild><Button className='text-white bg-blue-600 hover:bg-blue-700 cursor-pointer'><PenBox className='w-5 h-5'/>Edit</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Budget</DialogTitle>
                  <DialogDescription>
      
                  </DialogDescription>
      
                </DialogHeader>
                <div className='mt-2 relative'>
                  <Button onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                    size="lg" variant='outline' className='cursor-pointer text-lg'>{emojiIcon}</Button>
                  <div className='absolute z-10 right-0 top-0'>
                    <EmojiPicker
                      open={openEmojiPicker}
                      onEmojiClick={(emoji) => {
                        setEmojiIcon(emoji.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                  <div className='mt-2'>
                    <h2 className='text-black font-medium my-1'>Budget Name</h2>
                    <Input type='text'
                      value={name} placeholder='e.g. Home Decoration' className='mt-1' onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className='mt-2'>
                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                    <Input type='number' 
                    value={amount?amount:''} placeholder='e.g. 1000' className='mt-1' onChange={(e) => setAmount(Number(e.target.value))} />
                  </div>
      
      
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button disabled={!(name && amount)}
                      onClick={() => { onUpdateBudget() }} className='mt-5 w-full cursor-pointer'>Update Budget</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
    </div>
  )
}

export default EditBudget
