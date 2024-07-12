import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    // will immediately run and send a fetch request
    // because of [] - this will run only once
    useEffect(() => {
        const getConversation = async () => {
            setLoading(true); // so we could show a loading spinner
            try {
                const res = await fetch('/api/users'); // fetch request to our endpoint
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }

                setConversations(data);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        getConversation(); // call the function immediately
    }, []);

    return { loading, conversations };
}

export default useGetConversations;