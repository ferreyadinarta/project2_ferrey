import React from 'react'

export default function NotFound() {
  return (
    <div className='flex flex-col w-full my-[15rem] align-center items-center'>
        <h1 className='font-bold text-5xl text-amber-500'>404</h1>
        <h1 className='font-bold text-gray-400 text-2xl'>Oops... Page not found.</h1>
        <p>Wrong page location</p>
    </div>
  )
}
