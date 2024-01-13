import React, { useState } from 'react'
import { FaChartLine, FaTableColumns, FaCalendarDays, FaBagShopping, FaCircleQuestion, FaPeopleGroup, FaGear, FaRightFromBracket } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const [datas, setDatas] = useState(
        [
            {
                navtitle: 'Dashboard',
                icon: <FaTableColumns />,
                selected: false
            },
            {
                navtitle: 'Products',
                icon: <FaBagShopping />,
                selected: true
            },
            {
                navtitle: 'Analytics',
                icon: <FaChartLine />,
                selected: false
            },
            {
                navtitle: 'Schedule',
                icon: <FaCalendarDays />,
                selected: false
            },
            {
                navtitle: 'Help',
                icon: <FaCircleQuestion />,
                selected: false
            },
            {
                navtitle: 'Community',
                icon: <FaPeopleGroup />,
                selected: false
            },
            {
                navtitle: 'Settings',
                icon: <FaGear />,
                selected: false
            }
        ])
    const navigate = useNavigate()
    const handleSelect = (selectedIndex) => {
        const selectData = datas.map((data, index) => {
            if (index === selectedIndex) {
                return { ...data, selected: true }
            } else {
                return { ...data, selected: false }
            }
        })
        setDatas(selectData)
    }
    const handleLogOut = ()=>{
        navigate('/login')
        localStorage.removeItem('accesskey')
        localStorage.removeItem('username')
    }
    return (
        <div className='flex flex-col w-1/5 gap-8 py-4 px-8 text-md border-r h-screen'>
            <div className='text-amber-400 font-bold text-2xl text-center'>Logo</div>
            <hr />
            {datas.map((data, index) => (
                <div key={index}>
                    {data.selected ? (
                    <button className='bg-amber-400 w-36 rounded-full flex flex-row h-10 gap-4 justify-center  items-center' onClick={() => handleSelect(index)}>
                        <div className='text-white w-fit'>{data.icon}</div>
                        <div className='text-white font-bold'>
                            {data.navtitle}
                        </div>
                    </button>
                    ) : (
                    <button className='rounded-full w-36 flex flex-row h-10 gap-2 justify-center items-center hover:bg-amber-400 duration-100' onClick={() => handleSelect(index)}>
                        {data.icon}
                        <h1>
                            {data.navtitle}
                        </h1>
                    </button>
                    )}
                    {index === 3 && <hr className='my-2 gap-0'/>}
                </div>
            ))}
            <hr/>
            <button className='flex flex-row h-8 gap-4 bg-black rounded-full justify-center items-center text-white hover:border-amber-500 hover:border-4' onClick={handleLogOut}><FaRightFromBracket/>Log out</button>
        </div>
    )
}
