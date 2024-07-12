import './App.css';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Home from './pages/home/Home.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext.jsx";

// fix - a divider between conversations
// fix - name of useConversation zustand hook
// fix - add documentation in e.preventDefault(); as: we have to put it everytime
// fix - messageContainer - show name of user in noChatSelected component
// fix - error message in log chrome when 2 users connected
// socket error in url - inside SocketContext line 19

function App() {
  const {authUser} = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to="/login" />}/>
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login/>}/>
        {/* <Route path="/signup" element={<Signup/>}/> */}
        {/* if you already visit signup page (if authUser is authenticated)
        we'll be navigated to homepage, else you will go to signup page */}
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App;
