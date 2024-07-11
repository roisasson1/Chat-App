import { useState } from "react";
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext.jsx";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputErrors({username, password});
        if (!success) return;
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", 
            { method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})})

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            
            // when we refresh the page we can get the value from the local stroage
            //  to know if we're logged in
            // 'data' is the object that returns from the backend
            localStorage.setItem('chat-user', JSON.stringify(data));
            toast.success('Login successful!');

            // make sure to navigate this user to the home page
            // context
            setAuthUser(data);


        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login };
}

export default useLogin;


function handleInputErrors({username, password}) {
    if (!username ||!password) {
        toast.error('Please fill in all required fields');
        return false;
    }

    return true;
}