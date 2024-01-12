import Home from "./Home";
import Login from "./Login";
import { Routes, Route } from 'react-router-dom'

export default function App() {
  const token =localStorage.getItem('accesskey');
  const username = localStorage.getItem('username')
  console.log(token)
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path='/home' element={<Home token={token} username={username}/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Login/> } />
      </Routes>
    </div>
  );
}