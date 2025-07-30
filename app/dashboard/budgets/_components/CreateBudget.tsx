'use client'
import React from 'react'
import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

type Budget = {
  name: string,
  amount: number,
  emoji: string
}


function CreateBudget({refreshData}: {refreshData() : void}) {

  const [emojiIcon, setEmojiIcon] = useState<string>('😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);

  const onCreateBudget = async () => {
    if (!name || !amount) return;

    const budget: Budget = {
      name,
      amount,
      emoji: emojiIcon,
    };

    // Call your API to create the budget
    const res = await fetch('/api/createbudgets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(budget),
    });

    if (!res.ok) {
      console.error('Failed to create budget');
      return;
    }
    refreshData();
    toast(" New Budget has been created."
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
        <DialogTrigger asChild><div className='bg-slate-100 p-10 rounded-md h-[160px] items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
          <h2 className='text-3xl'>+</h2>
          <h2 className='text-lg'>Create New Budget</h2>
        </div></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
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
              <Input type='number' placeholder='e.g. 1000' className='mt-1' onChange={(e) => setAmount(Number(e.target.value))} />
            </div>


          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button disabled={!(name && amount)}
                onClick={() => { onCreateBudget() }} className='mt-5 w-full cursor-pointer'>Create Budget</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateBudget;
