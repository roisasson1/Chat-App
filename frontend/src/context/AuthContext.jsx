import { createContext, useContext, useState } from 'react';

// we created a auth context
export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

// this is our provider that will hold our state
// it will wrap our application with [authUser, setAuthUser] value
// to be able to use this value we'll be using the useAuthContext hook above
export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};