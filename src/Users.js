import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import axios from 'axios'
import User from './Small Components/User'
import CircularProgress from '@mui/material/CircularProgress';

export default function Users({ username }) {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [sort, setSort] = useState(false)
    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            try {
                const res = await axios.get('https://fakestoreapi.com/users')
                const sortedUsers = res.data
                    .filter(user => user.name && user.name.firstname)
                    .sort((a, b) =>
                        sort ? b.name.firstname.localeCompare(a.name.firstname) : a.name.firstname.localeCompare(b.name.firstname)
                    );
                setUsers(sortedUsers);
                console.log(res.data)
                setLoading(false)
            }
            catch (err) {
                console.log(err.response)
                setLoading(false)
            }
        };
        fetchdata()
    }, [sort])

    return (
        <>
            <div className='flex flex-row'>
                <Sidebar />
                <div className='flex flex-col w-full px-5'>
                    <Navbar username={username} title="Users Info" subtitle="Here is the info of the users" sortVisible={true} setSort={setSort} sort={sort} />
                    {loading
                        ?
                        <div className='text-xl text-amber-500 my-auto ml-[40rem] lg:mx-auto lg:my-[20rem]'>
                            <CircularProgress />
                        </div>
                        :
                        <div className='grid grid-cols-2 lg:w-full md:grid-cols-1 gap-4 mt-4 lg:p-5 justify-items-center overflow-y-scroll h-[40rem]'>
                            {
                                users.map((user) =>
                                    <User key={user.id} email={user.email} firstName={user.name.firstname} lastName={user.name.lastname} city={user.address.city} street={user.address.street} phone={user.phone} />
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
