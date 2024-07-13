import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './App.css';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Home from './pages/home/Home.jsx';
import { useAuthContext } from "./context/AuthContext.jsx";


// fix - a divider between conversations
// socket error in url - inside SocketContext line 19
// http://localhost:5000
// https://chat-app-r4is.onrender.com/

function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to="/login" />}/>
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login/>}/>
        {/* if you already visit signup page (if authUser is authenticated)
        we'll be navigated to homepage, else you will go to signup page */}
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;
