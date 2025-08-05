'use client'
import React from 'react'
import Image from 'next/image'
import {LayoutGrid,RotateCcw,PiggyBank,ReceiptText} from 'lucide-react'
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type MenuItem = {
  id: number;
  name: string;
  icon: React.ElementType;
  path: string;
};



function SideNav() {

    const pathname = usePathname();

    const menuList: MenuItem[]=[
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid,
            path:'/dashboard'
        },
    {
        id:2,
        name:'Budgets',
        icon:PiggyBank,
        path:'/dashboard/budgets'
    }, 
      {
            id:3,
            name:'Expenses',
            icon:ReceiptText,
            path:'/dashboard/expenses'
        },
    {
        id:4,
        name:'Reset Data',
        icon:RotateCcw,
        path:'/dashboard/reset_all_budgets'
    }]
    return (
        <div className='h-screen pl-3 pr-3 shadow-md border-r border-black/30'>
            <div className='w-full flex justify-center items-center'>
            <div className="relative w-[110px] h-[110px] ">
                <Image src={'/Gemini_Generated_Image_dpjmvbdpjmvbdpjm.png'}
                    alt="Logo"
                    fill
                    className='cursor-pointer object-cover'
                />
            </div>
            </div>
            <div >
                 {menuList.map((menu,index)=>(
                    <Link href={menu.path} key={index}>
                    <h2 className={`flex gap-2 items-center  font-medium p-5 cursor-pointer rounded-md mb-1 hover:bg-blue-100 ${pathname === menu.path ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`} >
                        <menu.icon />
                        {menu.name}
                    </h2>
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-5 p-5 flex gap-2 items-center justify-center'>
                <UserButton  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: '40px',
                        height: '40px',
                      },
                    },
                  }}/>
                  Profile
            </div>

        </div>
    )
}

export default SideNav
