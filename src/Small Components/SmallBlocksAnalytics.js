import React from 'react'

export default function SmallBlocksAnalytics({icon, title, value}) {
  return (
    <div className='flex flex-row shadow-md rounded-md p-5 items-center gap-8 w-full'>
        {icon}
        <div className='flex flex-col'>
            <h2 className='font-bold text-md text-amber-500'>{value}</h2>
            <h1 className='font-bold'>{title}</h1>
        </div>
    </div>
  )
}
