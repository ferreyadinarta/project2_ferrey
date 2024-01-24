import React from 'react'


export default function Mail({title, icon, content, sender, date, onClick}) {
    return (
        <div className='flex mb-4 items-center gap-8 h-16 bg-gray-100 p-3 shadow-[0px_4px_0_0_rgba(240,163,10,0.7)] lg:shadow-none lg:border lg:border-amber-500 rounded-lg cursor-pointer hover:bg-amber-100 lg:mx-4' onClick={onClick}>
            {icon}
            <div className='flex flex-col lg:w-1/3 2xl:w-1/3'>
                <h1 className='font-bold text-md'>{title}</h1>
                <p className='text-xs text-slate-700'>From: {sender}</p>
            </div>
            <h2 className='text-sm text-slate-500 truncate w-1/3 md:hidden'>{content}</h2>
            <p className='ml-4 text-xs font-bold text-slate-400'>{date}</p>
        </div>
    )
}
