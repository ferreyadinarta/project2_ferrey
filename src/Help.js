import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Collapsible from './Small Components/Collapsible'

export default function Help({ username }) {
  const [expanded, setExpanded] = useState('panel1');
  const handleChange = (panel) => (newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <div className='flex flex-row'>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <div className='sm:fixed sm:z-[20] sm:bg-white'>
            <Navbar username={username} title="Help" subtitle="More info to help you out" />
          </div>
          <div className='flex flex-col justify-center items-center sm:mt-12 lg:w-full'>
            <h1 className='text-4xl text-center w-2/5 my-10 font-bold sm:text-2xl sm:w-3/5 md:text-3xl md:w-3/5 lg:w-4/5 lg:text-3xl'>Answers to our most frequently asked questions</h1>
            <Collapsible index={1} question={'How to use this website?'} expanded={expanded} onChange={handleChange} answer={'Ipsum in irure laborum irure voluptate ad elit. Aute reprehenderit et sunt excepteur elit reprehenderit amet ad ea et. Do ea consectetur amet nisi commodo irure excepteur dolor aliqua ut.'} />
            <Collapsible index={2} question={'Why is this website built?'} expanded={expanded} onChange={handleChange} answer={'Ipsum in irure laborum irure voluptate ad elit. Aute reprehenderit et sunt excepteur elit reprehenderit amet ad ea et. Do ea consectetur amet nisi commodo irure excepteur dolor aliqua ut.'} />
            <Collapsible index={3} question={'What is your process to build this website?'} expanded={expanded} onChange={handleChange} answer={'Ipsum in irure laborum irure voluptate ad elit. Aute reprehenderit et sunt excepteur elit reprehenderit amet ad ea et. Do ea consectetur amet nisi commodo irure excepteur dolor aliqua ut.'} />
            <Collapsible index={4} question={'Where to contact the admin?'} expanded={expanded} onChange={handleChange} answer={'Ipsum in irure laborum irure voluptate ad elit. Aute reprehenderit et sunt excepteur elit reprehenderit amet ad ea et. Do ea consectetur amet nisi commodo irure excepteur dolor aliqua ut.'} />
          </div>
        </div>
      </div>
    </>
  )
}
