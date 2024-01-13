import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

export default function UpperNav({username, setSearch}) {
    return (
        <>
            <div className='flex flex-row h-16 w-screen items-center'>
                <div className='flex flex-col pt-2 pl-5 w-1/3'>
                    <h1 className='font-bold text-md'>Products!</h1>
                    <p className='font-light text-sm'>Let's see your product</p>
                </div>
                <h1 className='font-bold text-xl w-1/3'>Welcome, {username} </h1>
                <form className='flex flex-row items-center gap-4'>
                    <input className='h-8 p-3 shadow-md rounded-full placeholder:text-sm' type='text' placeholder='Search by name' onChange={(e)=>setSearch(e.target.value)}/>
                    <FaMagnifyingGlass className='cursor-pointer'/>
                </form>
            </div>
            <hr className='mt-3' />
        </>
    )
}
