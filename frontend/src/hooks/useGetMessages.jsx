import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

import useConversation from "./zustand/useConversation";


const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    // update the conversation state
    const {messages, setMessages, selectedConversation} = useConversation();

    // whenever selected conversation ID changes, run this {} block
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true); // so we could show a loading spinner
            try {
                // router.get("/:id"...) in message.routes.js
                // the fetch url is dynamic and based on userId of selected conversation
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
    
                // extract the new message from the response
                const data = await res.json();
                
                if (data.error) {
                    throw new Error(data.error);
                }
    
                console.log("messages log:", data);
                setMessages(data);
    
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (selectedConversation?._id) getMessages(); // call the function immediately
    },
    // otherwise, messages will not be updated until selectedConversation ID changes
    [selectedConversation?._id, setMessages]);

    return { loading, messages };
}

export default useGetMessages;