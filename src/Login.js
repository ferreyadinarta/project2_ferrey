import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [password, setPassword] = useState('')
    const [passwordshow, setPasswordshow] = useState(true)
    const [error, setError] = useState('')
    const [inputuser, setInputuser] = useState('')
    const navigate= useNavigate()

    // fetch token jika user terdaftar, dan melakukan navigasi ke home
    const handleLogin = () => {
        setError('')
        setInputuser('')
        setPassword('')
        axios({
            url: 'https://fakestoreapi.com/auth/login',
            method: 'POST',
            data: {
                username:inputuser,
                password
            }
        }).then(res => {
            navigate('/home')
            localStorage.setItem('accesskey',res.data.token)
            localStorage.setItem('username',inputuser)
        }).catch(err => {
            if (err.response) {
                setError('Wrong username/password')
            }
        })
    }
    
    return (
        <>
            <div className='flex flex-row'>
                <div className='bg-amber-400 w-1/3 h-screen relative'>
                    <img className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-full' src="pictures/gambarlogin.png" alt='gambar-login' />
                </div>
                <div className='flex flex-col gap-8 w-2/3 justify-center items-center content-center font-serif'>
                    <h1 className='text-4xl font-bold'>Login Please</h1>
                    {error && <p className='text-red-400 text-center'>{error}</p>}
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor='username' className='pb-2'>Username</label>
                        <input className='border-black border-2 p-2 px-5 rounded-full w-full' value={inputuser} type="text" id='username' onChange={e => setInputuser(e.target.value)} required />
                        <br />
                        <label htmlFor='password' className='pb-2'>Password</label>
                        <div className='relative mb-14'>
                            {passwordshow ?
                                <>
                                    <input className='border-black border-2 p-2 px-5 rounded-full w-full' value={password} type="password" id='password' required onChange={e => setPassword(e.target.value)} />
                                    <FaEye className='absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 mr-2' onClick={() => setPasswordshow(!passwordshow)} />
                                </>
                                :
                                <>
                                    <input className='border-black border-2 p-2 px-5 rounded-full w-full' value={password} type="text" id='password' required onChange={e => setPassword(e.target.value)} />
                                    <FaEyeSlash className='absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 mr-2' onClick={() => setPasswordshow(!passwordshow)} />
                                </>
                            }
                        </div>
                        <button className='bg-black w-1/3 h-10 text-white text-s p-1 rounded-full mx-auto hover:-translate-y-1 hover:duration-100' onClick={handleLogin}>Log in</button>
                        <a className='text-slate-800 text-s underline text-center pt-2' href="/forget">Forget Password?</a>
                    </div>
                </div>
            </div>
        </>
    )
}
