import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import UpperNav from './UpperNav'
import { useNavigate } from 'react-router-dom'
import { FaTrash, FaPenToSquare, FaCheck } from 'react-icons/fa6'

export default function Home({ token, username }) {
    const [products, setProducts] = useState([])
    const [edit, setEdit] = useState(false)
    const [editName, setEditname] = useState('')
    const [editPrice, setEditprice] = useState('')
    const [editCategory, setEditcategory] = useState('')
    const [editingproductid, setEditingproductid] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios({
            url: 'https://fakestoreapi.com/products'
        }).then(res =>
                setProducts(res.data)
            ).catch(err =>
                console.log(err.response)
            )
    }, [])

    const deleteProduct = (productId) => {
        axios({
            url: `https://fakestoreapi.com/products/${productId}`,
            method: "DELETE"
        }).then(() => {
            setProducts(products.filter(product => product.id !== productId));
        }).catch(err =>
            console.log(err.response)
        )
    }

    const handleEdit = (index) =>{
        setEdit(true)
        setEditingproductid(index)
        const editcurrent = products.find(product => product.id === index)
        if(editcurrent){
            setEditname(editcurrent.title)
            setEditprice(editcurrent.price)
            setEditcategory(editcurrent.category)
        }
    }

    const handleSave = ()=>{
        const updatedProducts = products.map((product) => {
            if (product.id === editingproductid) {
              return { ...product, 
                title: editName,
                price: editPrice,
                category: editCategory };
            }
            return product;
          });
      
          setProducts(updatedProducts);
          setEdit(false);
          setEditingproductid(null);
    }

    if (token !== null) {
        return (
            <div>
                <div className='flex flex-row'>
                    <Navbar />
                    <div className='flex flex-col'>
                        <UpperNav username={username}/>
                        <div className='w-4/5 border-b p-5 h-[35rem] text-sm overflow-y-scroll'>
                            <table className='border table-fixed w-full'>
                                <thead>
                                    <tr className='border'>
                                        <th className='w-1/4 border'>Product Image</th>
                                        <th className='w-1/4 border'>Product Name</th>
                                        <th className='border'>Price</th>
                                        <th className='border'>Category</th>
                                        <th className='border'>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr className='border hover:bg-sky-100' key={product.id}>
                                            <td>
                                                <img className='w-1/4 mx-auto' src={product.image} alt={product.title} />
                                            </td>
                                            <td>
                                                {
                                                    edit && editingproductid === product.id ?
                                                    (<input 
                                                        className='w-60 border-2 border-gray-400 rounded-md p-2' placeholder='Change Name' 
                                                        value={editName} 
                                                        onChange={(e)=>setEditname(e.target.value)}
                                                    />)
                                                    :
                                                    (<p className='text-center'>{product.title}</p>)
                                                }
                                            </td>
                                            <td className='text-center'>
                                                {
                                                    edit && editingproductid === product.id ?
                                                    (<input 
                                                        className='w-20 border-2 border-gray-400 rounded-md p-2' 
                                                        type='number'
                                                        placeholder='Edit' 
                                                        value={editPrice} 
                                                        onChange={(e)=>setEditprice(e.target.value)}
                                                    />)
                                                    :
                                                    <p className='font-bold'>{product.price}</p>
                                                }
                                            </td>
                                            <td className='text-center'>
                                            {
                                                    edit && editingproductid === product.id ?
                                                    (<input 
                                                        className='w-32 border-2 border-gray-400 rounded-md p-2' placeholder='Edit' 
                                                        value={editCategory} 
                                                        onChange={(e)=>setEditcategory(e.target.value)}
                                                    />)
                                                    :
                                                    <p>{product.category}</p>
                                                }
                                            </td>
                                            <td className='flex flex-row h-44 justify-center'>
                                                <FaTrash
                                                    className='text-xl my-auto hover:text-red-500 cursor-pointer'
                                                    onClick={()=>deleteProduct(product.id)}
                                                />
                                                {edit && editingproductid === product.id ?
                                                <FaCheck
                                                    className='text-xl my-auto text-blue-500 hover:border-2 hover:text-blue-600 hover:border-blue-500 hover:rounded-md cursor-pointer ml-2'
                                                    onClick={handleSave}
                                                />
                                                :
                                                <FaPenToSquare
                                                    className='text-xl my-auto hover:text-blue-500 cursor-pointer ml-2'
                                                    onClick={()=>handleEdit(product.id)}
                                                />
                                                }
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
