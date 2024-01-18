import React from 'react'

export default function BlocksAnalytics({icon, title, value, otherinfo}) {
  return (
    <div className='flex flex-row shadow-md rounded-md p-10 items-center gap-14 w-full xl:justify-center'>
        {icon}
        <div className='flex flex-col'>
            <h1 className='font-bold'>{title}</h1>
            <h2 className='font-bold text-lg text-amber-500'>{value}</h2>
            <h1 className='font-light'>{otherinfo}</h1>
        </div>
    </div>
  )
}
