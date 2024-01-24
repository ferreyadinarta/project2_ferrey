import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { FaTrash, FaPenToSquare, FaCheck, FaX } from 'react-icons/fa6'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material'



export default function Home({ token, username, searchVisible }) {
    const [products, setProducts] = useState([])
    const [edit, setEdit] = useState(false)
    const [editName, setEditname] = useState('')
    const [editPrice, setEditprice] = useState('')
    const [editCategory, setEditcategory] = useState('')
    const [editingproductid, setEditingproductid] = useState('')
    const [search, setSearch] = useState('')
    const [OpenModal, setOpenModal] = useState(false)
    const [addName, setAddName] = useState('')
    const [addCategory, setAddCategory] = useState('')
    const [addPrice, setAddPrice] = useState('')
    const [addImage, setAddImage] = useState('')
    const [addDescription, setAddDescription] = useState('')
    const [addSuccess, setAddSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    // fetch semua produk
    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            try {
                const products = await axios.get('https://fakestoreapi.com/products')
                setProducts(products.data)
                setLoading(false)
            }
            catch (err) {
                console.log(err.response)
            }
        }
        fetchdata()
    }, [])

    // menghapus produk berdasarkan id tombol delete
    const deleteProduct = async (productId) => {
        await axios({
            url: `https://fakestoreapi.com/products/${productId}`,
            method: "DELETE"
        }).then(() => {
            setProducts(products.filter(product => product.id !== productId));
        }).catch(err =>
            console.log(err.response)
        )
    }

    // set editing state jadi true
    const handleEdit = (index) => {
        setEdit(true)
        setEditingproductid(index)
        const editcurrent = products.find(product => product.id === index)
        if (editcurrent) {
            setEditname(editcurrent.title)
            setEditprice(editcurrent.price)
            setEditcategory(editcurrent.category)
        }
    }

    // menyimpan hasil editing
    const handleSave = (e) => {
        e.stopPropagation()
        setEdit(false);
        setEditingproductid(null);
        const updatedProducts = products.map((product) => {
            if (product.id === editingproductid) {
                return {
                    ...product,
                    title: editName,
                    price: editPrice,
                    category: editCategory
                };
            }
            return product;
        });
        setProducts(updatedProducts);
    }

    // filter hasil dari search
    const filteredProduct = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    // buka modal
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: '300px',
            sm: '500px',
            md: '700px',
        },
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // menambahkan produk
    const handleSubmitAdd = async () => {
        const addData = {
            title: addName,
            price: addPrice,
            description: addDescription,
            image: addImage,
            category: addCategory
        }
        try {
            await axios({
                url: `https://fakestoreapi.com/products`,
                method: "POST",
                body: JSON.stringify(addData)
            })
            setOpenModal(false)
            setAddSuccess(true)
            setTimeout(() =>
                setAddSuccess(null)
                , 3000)
        }
        catch (err) {
            setOpenModal(true)
            setAddSuccess(false)
            setTimeout(() =>
                setAddSuccess(null)
                , 3000)
            console.log(err.response)
        }
    }


    return (
        <div>
            <div className='flex'>
                <Sidebar />
                <div className='flex flex-col flex-1'>
                    <Navbar username={username} setSearch={setSearch} openModal={handleOpen} title="Products" subtitle="Let's see your products" searchVisible={true} addVisible={true} />
                    {addSuccess === true && <Alert severity='success'>Submission Success!</Alert>}
                    {/* Modal */}
                    <div>
                        <Modal
                            open={OpenModal}
                            onClose={handleClose}
                            closeAfterTransition
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Fade in={OpenModal}>
                                <Box sx={style}>
                                    {addSuccess === false &&
                                        <Alert severity='error'>Error Submission Failed!</Alert>
                                    }
                                    <Typography className='relative' variant="h5" component="h2">
                                        Add Product
                                    </Typography>
                                    <FaX className='absolute right-10 top-10 cursor-pointer hover:text-red-500' onClick={handleClose} />
                                    <hr className='mt-2' />
                                    <div className='flex flex-col'>
                                        <label id='name' className='text-lg my-2'>Product Name:</label>
                                        <input autoComplete='off' type='text' id='name' className='border border-black border-2 rounded-md p-2' onChange={e => setAddName(e.target.value)} />

                                        <label id='name' className='text-lg my-2'>Product Image Link:</label>
                                        <input autoComplete='off' type='text' id='name' className='border border-black border-2 rounded-md p-2' onChange={e => setAddImage(e.target.value)} />

                                        <label id='name' className='text-lg my-2'>Product Description:</label>
                                        <input autoComplete='off' type='text' id='name' className='border border-black border-2 rounded-md p-2' onChange={e => setAddDescription(e.target.value)} />

                                        <label id='name' className='text-lg my-2'>Product Category:</label>
                                        <input autoComplete='off' type='text' id='name' className='border border-black border-2 rounded-md p-2' onChange={e => setAddCategory(e.target.value)} />

                                        <label id='name' className='text-lg my-2'>Product Price:</label>
                                        <input autoComplete='off' type='number' id='name' className='border border-black border-2 rounded-md p-2' onChange={e => setAddPrice(e.target.value)} />

                                        <button onClick={handleSubmitAdd} className='p-4 my-8 bg-amber-500 font-bold rounded-full'>Add Product</button>
                                    </div>
                                </Box>
                            </Fade>
                        </Modal>
                    </div>

                    {/* Home page */}
                    {loading ?
                        <div className='text-xl text-amber-500 w-full ml-[40rem] xl:ml-[30rem] md:ml-[20rem] sm:ml-[10rem] lg:h-full my-auto '>
                            <CircularProgress />
                        </div>
                        :
                        <div className='2xl:w-full border-b h-[40rem] text-sm p-0 overflow-y-scroll sm:overflow-x-hidden'>
                            <table className='border table-fixed w-full'>
                                <thead>
                                    <tr className='border sticky h-10 -top-1 bg-white border shadow-md'>
                                        <th className='w-1/6 sm:w-1/3 md:w-1/6 lg:w-1/5 border'>Product Image</th>
                                        <th className='w-1/6 sm:w-1/3 md:w-1/6 lg:w-1/5 border'>Product Name</th>
                                        <th className='border w-1/6 sm:w-1/3 md:w-1/12 lg:w-1/12'>Price</th>
                                        <th className='border w-1/6 sm:hidden lg:w-1/6'>Category</th>
                                        <th className='border w-1/6 sm:hidden md:w-1/6 lg:w-1/12'>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products !== null ?
                                        filteredProduct.map((product, index) => (
                                            <Fragment key={product.id}>
                                                <tr className="hover:bg-amber-100">
                                                    <td className='cursor-pointer' onClick={() => document.getElementById(index).showModal()}>
                                                        <img className='w-1/4 lg:w-2/4 mx-auto' src={product.image} alt={product.title} />
                                                        <h1 className='text-xs text-amber-500 text-center'>Click here to see details</h1>
                                                    </td>
                                                    <td>
                                                        {/* Product Name */}
                                                        {
                                                            edit && editingproductid === product.id ?
                                                                (<input
                                                                    className='w-60 border-2 border-gray-400 rounded-md p-2 z-[10]' placeholder='Change Name'
                                                                    value={editName}
                                                                    onChange={(e) => setEditname(e.target.value)}
                                                                />)
                                                                :
                                                                (<p className='text-center'>{product.title}</p>)
                                                        }
                                                    </td>
                                                    <td className='text-center md:table-cell lg:table-cell'>
                                                        {
                                                            edit && editingproductid === product.id ?
                                                                (<input
                                                                    className='w-20 border-2 border-gray-400 rounded-md p-2'
                                                                    type='number'
                                                                    placeholder='Edit'
                                                                    value={editPrice}
                                                                    onChange={(e) => setEditprice(e.target.value)}
                                                                />)
                                                                :
                                                                <p className='font-bold'>{product.price}</p>
                                                        }
                                                    </td>
                                                    <td className='text-center lg:table-cell'>
                                                        {
                                                            edit && editingproductid === product.id ?
                                                                (<input
                                                                    className='w-32 border-2 border-gray-400 rounded-md p-2' placeholder='Edit'
                                                                    value={editCategory}
                                                                    onChange={(e) => setEditcategory(e.target.value)}
                                                                />)
                                                                :
                                                                <p>{product.category}</p>
                                                        }
                                                    </td>
                                                    <td className='flex h-32 justify-center gap-4 items-center md:table-cell lg:table-cell'>
                                                        {/* Edit/Delete Icons */}
                                                        <FaTrash
                                                            className='text-xl lg:mx-auto hover:text-red-500 cursor-pointer'
                                                            onClick={() => deleteProduct(product.id)}
                                                        />
                                                        {edit && editingproductid === product.id ?
                                                            <FaCheck
                                                                className='text-xl text-blue-500 hover:border-2 hover:text-blue-600 hover:border-blue-500 hover:rounded-md cursor-pointer lg:mx-auto lg:mt-4'
                                                                onClick={handleSave}
                                                            />
                                                            :
                                                            <FaPenToSquare
                                                                className='text-xl my-auto hover:text-blue-500 cursor-pointer lg:mx-auto lg:mt-4'
                                                                onClick={() => handleEdit(product.id)}
                                                            />
                                                        }
                                                    </td>
                                                </tr>
                                            </Fragment>
                                        ))
                                        :
                                        <Box sx={{ width: '100%', marginX: 'auto' }}>
                                            <CircularProgress sx={{ height: '1000px' }} />
                                        </Box>
                                    }
                                </tbody>
                            </table>
                            {filteredProduct.map((product, index) => (

                                <dialog id={index} key={index} className="modal modal-middle sm:modal-bottom border border-amber-500">
                                    <div className="modal-box">
                                        <h1 className="font-bold text-lg text-center mb-2">Product Details</h1>
                                        <h3 className="font-bold">Product Name</h3>
                                        <h3>{product.title}</h3>
                                        <hr className='my-3' />
                                        <h3 className="font-bold">Product Description</h3>
                                        <h3 className='text-justify'>{product.description}</h3>
                                        <hr className='my-3' />
                                        {
                                            product.rating.rate > 2.5 ?
                                                <h3 className='text-lime-600 font-bold'><span className='text-black'>Rating:</span> {product.rating.rate}</h3>
                                                :
                                                <h3 className='text-rose-600 font-bold'><span className='text-black'>Rating:</span> {product.rating.rate}</h3>
                                        }
                                        <h3><span className='font-bold'>Price:</span> {product.price}</h3>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            ))}
                        </div>}

                </div>
            </div>
        </div >
    )
}
