import { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import { Routes, Route } from 'react-router-dom'

export default function App() {
  const[token,setToken]=useState(localStorage.getItem('accesskey'));
  const[username, setUsername] = useState('')
  console.log(token)
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path='/home' element={<Home token={token} username={username}/>} />
        <Route path='/login' element={<Login token={token} setToken={setToken} setUsername={setUsername}/>} />
        <Route path='/' element={<Login token={token} setToken={setToken} setUsername={setUsername}/> } />
      </Routes>
    </div>
  );
}