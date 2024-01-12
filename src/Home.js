import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import UpperNav from './UpperNav'
import { useNavigate } from 'react-router-dom'
import { FaTrash, FaPenToSquare } from 'react-icons/fa6'

export default function Home({ token, username }) {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios({
            url: `https://fakestoreapi.com/products`
        })
            .then(res =>
                setProducts(res.data)
            )
            .catch(err =>
                console.log(err.response)
            )
    }, [])

    if (token !== null) {
        return (
            <div>
                <div className='flex flex-row'>
                    <Navbar />
                    <div className='flex flex-col'>
                        <UpperNav username={username}/>
                        <div className='w-4/5 border-b p-5 h-[33.5rem] text-sm overflow-y-scroll'>
                            <table className='border w-full'>
                                <thead>
                                    <tr className='border'>
                                        <th className='w-1/2 border'>Product Name</th>
                                        <th className='border'>Price</th>
                                        <th className='border'>Category</th>
                                        <th className='border'>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr className='border' key={product.id}>
                                            <td className='flex items-center ml-10 my-4'>
                                                <img className='w-16 mr-2' src={product.image} alt={product.title} />
                                                <p className='ml-2'>{product.title}</p>
                                            </td>
                                            <td className='text-center'>
                                                <p className='font-bold'>{product.price}</p>
                                            </td>
                                            <td className='text-center'>
                                                <p>{product.category}</p>
                                            </td>
                                            <td className='flex flex-row h-44 justify-center items-center'>
                                                <FaTrash
                                                    className='text-xl my-auto hover:text-red-500 cursor-pointer'
                                                />
                                                <FaPenToSquare
                                                    className='text-xl my-auto hover:text-blue-500 cursor-pointer ml-2'
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        navigate('/login')
    }
}
