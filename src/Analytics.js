import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
export default function Analytics({ username }) {
    return (
        <>
            <div className='flex flex-row'>
                <Sidebar />
                <div className='flex flex-col'>
                    <Navbar username={username} title="Analytics" subtitle="Here is the analytics for your shop" />
                </div>
            </div>
        </>
    )
}
