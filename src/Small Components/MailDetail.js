import React from 'react'

export default function MailDetail({ mail, onClose }) {
    return (
        <div className='flex flex-col h-2/3 ml-24 p-20 lg:ml-0 lg:w-full items-center justify-center items-center sm:h-full sm:p-0'>
            <div className="w-2/3 sm:w-full bg-gray shadow-lg p-10 rounded-md" onClick={onClose}>
                <h2 className='font-bold text-xl sm:text-md'>{mail.title}</h2>
                <p className='my-3 font-bold sm:text-sm'>{mail.content}</p>
                <p className='sm:text-xs text-slate-500'>From: {mail.sender}</p>
                <p className='sm:text-xs text-slate-500'>Date: {mail.date}</p>
                <button className='bg-amber-500 p-2 rounded-md text-white font-bold mx-auto w-full my-4' onClick={onClose}>Close</button>
            </div>
        </div>
    )
}
