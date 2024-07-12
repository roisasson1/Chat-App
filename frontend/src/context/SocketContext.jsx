import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    // whenever the authUser changes, create a new socket connection or close the old one
    useEffect(() => {
        if (authUser) {
            const socket = io('https://chat-app-r4is.onrender.com/',{
                query: { userId: authUser._id }  // pass the user-id to the socket
            })
            setSocket(socket); // set the socket state to this connection

            // set the online users on the client side
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            // close the socket when the component unmounts
            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    );
}
