import { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Analytics from "./Analytics";
import Settings from "./Settings";
import Help from "./Help";

import { Routes, Route } from 'react-router-dom';

export default function App() {
  const token = localStorage.getItem('accesskey');
  const username = localStorage.getItem('username');
  const [authenticate, setAuthenticate] = useState(false);

  useEffect(() => {
    if (token && username) {
      setAuthenticate(true);
    } else {
      setAuthenticate(false);
    }
  }, [token, username]);

  return (
    <div className="overflow-x-hidden">
      <Routes>
        {authenticate ?
          <>
            <Route path='/dashboard' element={<Dashboard username={username} />} />
            <Route path='/products' element={<Home token={token} username={username}/>} />
            <Route path='/analytics' element={<Analytics username={username} />} />
            <Route path='/help' element={<Help username={username} />} />
            <Route path='/settings' element={<Settings username={username} />} />
            <Route path='*' element={<Home token={token} username={username} />} />
          </> 
          :
          <>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Login />} />
          </>
        }

      </Routes>
    </div>
  );
}