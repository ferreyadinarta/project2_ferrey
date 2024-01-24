import React from 'react'
import { FaArrowDownAZ, FaArrowDownZA, FaMagnifyingGlass, FaPlus } from 'react-icons/fa6'

export default function Navbar({ username, setSearch, title, subtitle, searchVisible, openModal, sortVisible, sort, setSort }) {
    return (
        <div>
            <div className='flex flex-row h-16 items-center px-10 md:w-screen md:gap-8 lg:gap-4'>
                <div className='w-1/6 hidden lg:block sm:w-1/6 md:w-1/12'>
                </div>
                <div className='flex flex-col sm:w-2/3'>
                    <h1 className='font-bold text-md sm:text-xl sm:text-left md:text-2xl md:text-center'>{title}</h1>
                    <p className='font-light text-sm md:hidden'>{subtitle}</p>
                </div>
                <h1 className='font-bold text-xl w-2/3 text-center sm:w-2/3 sm:hidden sm:text-right sm:pr-4 sm:text-[1rem] lg:w-1/3 md:text-right md:hidden'>Welcome, {username} </h1>
                {searchVisible ?
                    <div className='flex items-center lg:mr-4'>
                        <form className='flex flex-row items-center sm:hidden gap-4'>
                            <input className='h-8 p-3 shadow-md rounded-full placeholder:text-sm sm:w-[8rem]' type='text' placeholder='Search by name' onChange={(e) => setSearch(e.target.value)} />
                            <FaMagnifyingGlass className='cursor-pointer' />
                        </form>
                        <FaPlus className='cursor-pointer text-xl hover:border-2 hover:border-amber-500 ml-3 md:mr-2 md:text-3xl' onClick={openModal} />
                    </div>
                    :
                    null
                }
                {
                    sortVisible ?
                        <div onClick={() => setSort(!sort)}>
                            {sort ?
                                <div className='flex content-center gap-2'>
                                    <div className='font-bold'>Ascending </div>
                                    <FaArrowDownAZ className='self-center' />
                                </div>
                                :
                                <div className='flex content-center gap-2'>
                                    <div className='font-bold'>Descending </div>
                                    <FaArrowDownZA className='self-center'/>
                                </div>
                            }
                        </div>
                        :
                        null
                }
            </div>
            <hr className='mt-3' />
        </div>
    )
}
