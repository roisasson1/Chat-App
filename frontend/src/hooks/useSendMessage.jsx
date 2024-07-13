import { useState } from "react";
import toast from "react-hot-toast";

import useConversation from "./zustand/useConversation";


const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    // update the conversation state
    const {messages, setMessages, selectedConversation} = useConversation();

    // call function inside our message input and add the input value to our message
    const sendMessage = async (message) => {
        setLoading(true);
        try {
            // // router.get("/send/:id"...) in message.routes.js
            // the fetch url is dynamic and based on userId of selected conversation
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });

            // extract the new message from the response
            const data = await res.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            // ...messages = all the previous messages + the new message
            setMessages([...messages, data]);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { sendMessage, loading };
}

export default useSendMessage;