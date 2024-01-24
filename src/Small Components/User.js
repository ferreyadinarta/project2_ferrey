import React from 'react'
import { FaUser } from 'react-icons/fa6'

export default function User({ email, firstName, lastName, city, street, phone }) {
    return (
        <div className='p-10 w-full md:w-4/5 lg:2/5 lg:ml-0 bg-black rounded-lg text-white hover:bg-amber-500'>
            <div className='flex align-center items-center gap-14'>
                <FaUser className="text-3xl sm:hidden"/>
                <div className='sm:text-sm'>
                    <p className='font-bold'>Full Name: {firstName} {lastName}</p>
                    <p>Email: {email}</p>
                    <p>City: {city}</p>
                    <p>Street: {street}</p>
                    <p>Phone: {phone}</p>
                </div>
            </div>
        </div>
    )
}
