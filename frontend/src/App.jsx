import './App.css';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Home from './pages/home/Home.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import { useAuthContext } from "./context/AuthContext.jsx";

function App() {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        {/* if you already visit signup page (if authUser is authenticated)
        we'll be navigated to homepage, else you will go to signup page */}
        {/* <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup/>}/> */}
      </Routes>
    </div>
  )
}

export default App;
