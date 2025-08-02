import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='flex items-center justify-between px-7 pt-3 border shadow-sm'>
      <div ></div>
      <div>
                <UserButton appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: '40px',
                        height: '40px',
                      },
                    },
                  }}/></div>
    </div>
  )
}

export default DashboardHeader
