import { useState } from "react";
import toast from 'react-hot-toast';

import { useAuthContext } from "../context/AuthContext.jsx";


export const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({fullname, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullname, username, password, confirmPassword, gender});
        if (!success) return;
        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", 
            { method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({fullname, username, password, confirmPassword, gender})})

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            
            // when we refresh the page we can get the value from the local stroage
            //  to know if we're logged in
            // 'data' is the object that returns from the backend
            localStorage.setItem('chat-user', JSON.stringify(data));
            toast.success('Signup successful! You can now log in.');

            // make sure to navigate this user to the home page
            // context
            setAuthUser(data);


        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup };
}

export default useSignup;


function handleInputErrors({fullname, username, password, confirmPassword, gender}) {
    if (!fullname ||!username ||!password ||!confirmPassword ||!gender) {
        toast.error('Please fill in all required fields');
        return false;
    }

    if (password!== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }

    if (password.length < 4) {
        toast.error('Password should be at least 4 characters long');
        return false;
    }

    return true;
}