'use client'
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';



type DashboardLayoutProps = {
    children: React.ReactNode;
};

type Budgets ={
    id:number,
    name:string,
    amount:number,
    icon?:string|null,
    createdBy:string
}


function DashboardLayout({ children }: DashboardLayoutProps) {
    // const [budgets, setBudgets] = useState<Budgets[]>([]);

const {user}=useUser();
// const router=useRouter();

// useEffect(()=>{
//     if (!user) return;
//      fetch('/api/budgets')
//     .then(res => res.json())
//     .then((data) => {
//       setBudgets(data);
//       console.log(data);
//       if(data?.length==0)
//       {
//         router.replace('/dashboard/budgets');
//       }
//     });

// },[user])

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