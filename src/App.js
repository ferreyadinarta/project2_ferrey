import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Inbox from "./Inbox";
import Help from "./Help";

import { Routes, Route } from 'react-router-dom';
import NotFound from "./Error Page/NotFound";

export default function App() {
  const token = localStorage.getItem('accesskey');
  const username = localStorage.getItem('username');

  return (
    <div className="overflow-x-hidden max-h-screen">
      <Routes>
        {token ?
          <>
            <Route path='/dashboard' element={<Dashboard username={username} />} />
            <Route path='/products' element={<Home token={token} username={username}/>} />
            <Route path='/user info' element={<Users username={username} />} />
            <Route path='/help' element={<Help username={username} />} />
            <Route path='/inbox' element={<Inbox username={username} />} />
            <Route path='*' element={<NotFound />} />
          </> 
          :
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Login />} />
            <Route path='*' element={<Login />} />
          </>
        }

      </Routes>
    </div>
  );
}