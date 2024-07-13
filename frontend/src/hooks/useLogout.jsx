import { useState } from "react";
import toast from 'react-hot-toast';

import { useAuthContext } from "../context/AuthContext";


const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/logout", { method: 'POST',
                    headers: { 'Content-Type': 'application/json' }});
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.removeItem("chat-user"); // remove the user from local storage
            setAuthUser(null); // remove the user from the context - authUser (app.jsx) = null
        }
        catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, logout };
}

export default useLogout;