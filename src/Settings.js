import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function Settings({username}) {
  return (
    <>
      <div className='flex flex-row'>
        <Sidebar />
        <div className='flex flex-col'>
          <Navbar username={username} title="Settings" subtitle="Set your accounts here" />
        </div>
      </div>
    </>
  )
}
