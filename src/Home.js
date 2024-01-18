import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { FaTrash, FaPenToSquare, FaCheck, FaX } from 'react-icons/fa6'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';


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
    const [openSidebar, setOpenSidebar] = useState(false)


    // fetch semua produk
    useEffect(() => {
        axios({
            url: 'https://fakestoreapi.com/products'
        }).then(res =>
            setProducts(res.data)
        ).catch(err =>
            console.log(err.response)
        )
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
    const handleSave = () => {
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
            const res = await axios({
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
                    <Navbar username={username} setSearch={setSearch} openModal={handleOpen} title="Products" subtitle="Let's see your products" searchVisible={true} addVisible={true} setOpenSidebar={setOpenSidebar} />
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
                    <div className='w-full border-b h-[40rem] text-sm p-0 overflow-y-scroll'>
                        <table className='border table-fixed w-full'>
                            <thead>
                                <tr className='border sticky h-10 -top-1 bg-white border shadow-md'>
                                    <th className='w-1/5 sm:w-1/3 md:w-1/6 lg:w-1/5 border'>Product Image</th>
                                    <th className='w-1/5 sm:w-1/3 md:w-1/6 lg:w-1/5 border'>Product Name</th>

                                    <th className='border w-1/5 sm:w-1/3 md:w-1/6 lg:w-1/12'>Price</th>
                                    <th className='border w-1/5 sm:hidden lg:w-1/12'>Category</th>
                                    <th className='border w-1/6 sm:hidden md:w-1/6 lg:w-1/12'>Edit/Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {filteredProduct.map((product) => (
                                    <tr className="hover:bg-amber-100 cursor-pointer" key={product.id}>
                                        <td>
                                            {/* Show Image Only on Small Screens */}
                                            <img className='w-1/4 lg:w-2/4 mx-auto' src={product.image} alt={product.title} />
                                        </td>
                                        <td>
                                            {/* Product Name */}
                                            {
                                                edit && editingproductid === product.id ?
                                                    (<input
                                                        className='w-60 border-2 border-gray-400 rounded-md p-2' placeholder='Change Name'
                                                        value={editName}
                                                        onChange={(e) => setEditname(e.target.value)}
                                                    />)
                                                    :
                                                    (<p className='text-center'>{product.title}</p>)
                                            }
                                        </td>
                                        <td className='text-center md:table-cell lg:table-cell'>
                                            {/* Price - Show on Medium and Large Screens */}
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
                                            {/* Category - Show on Large Screens */}
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
                                        <td className='flex h-44 justify-center items-center md:table-cell lg:table-cell'>
                                            {/* Edit/Delete Icons */}
                                            <FaTrash
                                                className='text-xl my-auto mx-auto hover:text-red-500 cursor-pointer'
                                                onClick={() => deleteProduct(product.id)}
                                            />
                                            {edit && editingproductid === product.id ?
                                                <FaCheck
                                                    className='text-xl my-auto text-blue-500 hover:border-2 hover:text-blue-600 hover:border-blue-500 hover:rounded-md cursor-pointer mx-auto my-4'
                                                    onClick={handleSave}
                                                />
                                                :
                                                <FaPenToSquare
                                                    className='text-xl my-auto hover:text-blue-500 cursor-pointer mx-auto my-4'
                                                    onClick={() => handleEdit(product.id)}
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
}
