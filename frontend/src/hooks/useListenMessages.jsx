import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from '../assets/sounds/notification.mp3';

// we will not return anything because we'll be listening for messages
const useListenMessages = () => {
    const {socket} = useSocketContext(); // get the socket from the context
    const {messages, setMessages} = useConversation(); // get the messages from the conversation state

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true; // shake the conversation visually
            const sound = new Audio(notificationSound);
            sound.play(); // play the notification sound
            setMessages([...messages, newMessage]); // add the new message to the messages array
        })

        return () => {
            socket?.off("newMessage"); // remove the event listener when the component unmounts
        }
    }, [socket, setMessages, messages]); // run this effect when the socket/set/messages changes
}

export default useListenMessages;