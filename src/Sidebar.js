import React from 'react';
import { FaChartLine, FaTableColumns, FaBagShopping, FaCircleQuestion, FaGear, FaRightFromBracket, FaBars } from 'react-icons/fa6'
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const datas = [
        { navtitle: 'Dashboard', icon: <FaTableColumns /> },
        { navtitle: 'Products', icon: <FaBagShopping /> },
        { navtitle: 'Analytics', icon: <FaChartLine /> },
        { navtitle: 'Help', icon: <FaCircleQuestion /> },
        { navtitle: 'Settings', icon: <FaGear /> },
    ];

    const navigate = useNavigate();

    const handleLogOut = () => {
        navigate('/login');
        window.location.reload();
        localStorage.removeItem('accesskey');
        localStorage.removeItem('username');
    };

    const handleSelect = (selectedIndex) => {
        const selectedRoute = datas[selectedIndex].navtitle.toLowerCase();
        navigate(`/${selectedRoute}`);
    };


    return (
        <>
            <div className="flex hidden lg:block">
                <input type="checkbox" id="drawer-toggle" className="relative sr-only peer sm:block lg:block"/>
                <label htmlFor="drawer-toggle" className="absolute top-0 left-0 inline-block p-4 sm:peer-checked:block sm:peer-checked:left-0 sm:peer-checked:z-[30] sm:peer-checked:size-[2rem] sm:peer-checked:opacity-100 sm:peer-checked:bg-transparent sm:peer-checked:text-black peer-checked:left-64 peer-checked:size-full peer-checked:text-transparent peer-checked:z-[20] peer-checked:bg-black peer-checked:opacity-10">
                    <FaBars className='cursor-pointer sm:text-3xl md:text-4xl lg:text-2xl lg:block lg:ml-4 xl:hidden'/>
                </label>
                <div className="fixed top-0 left-0 z-20 w-64 h-full transition-all duration-200 transform -translate-x-full bg-white shadow-lg peer-checked:translate-x-0 sm:w-screen">
                    <div className='flex flex-col w-1/8 gap-8 py-4 px-8 text-md border-r'>
                        <div className='text-amber-400 font-bold text-2xl text-center'>Logo</div>
                        <hr />
                        {datas.map((data, index) => (
                            <NavLink
                                key={index}
                                to={`/${data.navtitle.toLowerCase()}`}
                                onClick={() => handleSelect(index)}
                                className={({ isActive }) => [
                                    `p-3 w-36 rounded-md flex flex-row h-10 gap-4 items-center lg:w-full
                        ${isActive ? 'bg-amber-400' : 'bg-black text-white hover:bg-amber-400 duration-100'}`,
                                ]}
                            >
                                <div className='text-white w-fit'>{data.icon}</div>
                                <div className='text-white font-bold'>{data.navtitle}</div>
                            </NavLink>
                        ))}
                        <hr />
                        <button
                            className='flex flex-row h-8 gap-4 bg-black rounded-full justify-center items-center text-white hover:border-amber-500 hover:border-4'
                            onClick={handleLogOut}
                        >
                            <FaRightFromBracket />
                            Log out
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-1/8 gap-8 py-4 px-8 text-md border-r h-screen lg:hidden'>
                <div className='text-amber-400 font-bold text-2xl text-center'>Logo</div>
                <hr />
                {datas.map((data, index) => (
                    <NavLink
                        key={index}
                        to={`/${data.navtitle.toLowerCase()}`}
                        onClick={() => handleSelect(index)}
                        className={({ isActive }) => [
                            `p-3 w-36 rounded-md flex flex-row h-10 gap-4 items-center 
                        ${isActive ? 'bg-amber-400' : 'bg-black text-white hover:bg-amber-400 duration-100'}`,
                        ]}
                    >
                        <div className='text-white w-fit'>{data.icon}</div>
                        <div className='text-white font-bold'>{data.navtitle}</div>
                    </NavLink>
                ))}
                <hr />
                <button
                    className='flex flex-row h-8 gap-4 bg-black rounded-full justify-center items-center text-white hover:border-amber-500 hover:border-4'
                    onClick={handleLogOut}
                >
                    <FaRightFromBracket />
                    Log out
                </button>
            </div>
        </>
    );
}