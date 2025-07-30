import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis,ResponsiveContainer } from 'recharts'


type BudgetsList = {
    id: number,
    name: string,
    amount: number,
    icon?: string | null,
    createdBy: string,
    totalSpent?: number | null,
    totalItem?: number | null
}
function BarChartDashboard({ budgetsList }: { budgetsList: BudgetsList[] | null }) {
    return (
        <div className='border overflow-auto rounded-lg p-5'>
            {budgetsList ?
                <div>
                    <h2 className='font-bold text-lg'>Activity</h2>
                    <ResponsiveContainer width="80%" height={300}>
                    <BarChart data={budgetsList!} >

                        {/* <CartesianGrid strokeDasharray="1 1" /> */}
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalSpent" stackId="a" fill="#4845d2" />
                        <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
                : (
                    <div className='h-[250px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
                )
            }
        </div>
    )
}

export default BarChartDashboard
