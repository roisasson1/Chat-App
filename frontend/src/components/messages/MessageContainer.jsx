import { TiMessages } from "react-icons/ti";
import { useEffect } from 'react';

import Messages from '../messages/Messages.jsx';
import MessageInput from './MessageInput.jsx';
import useConversation from '../../hooks/zustand/useConversation.js';
import { useAuthContext } from '../../context/AuthContext.jsx';


const MessageContainer = () => {
    // const noChatSelected = true; => replace with actual logic to check if a chat is selected
    const {selectedConversation, setSelectedConversation} = useConversation();

    // {reset the selected conversation when component unmounts},
    // [else, remember the selected conversation]
    useEffect(() => {
      return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

  return (
    <div className='md:min-w-[450px] flex flex-col'>
        {!selectedConversation ? <NoChatSelected/> :(
        <>
            { /* header */}
            <div className='bg-slate-500 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span>{" "}
					<span className='text-gray-900 font-bold'>{selectedConversation.fullname}</span>
            </div>
            <Messages/>
            <MessageInput/>
        </>
        )}
    </div>
  )
}

export default MessageContainer;


const NoChatSelected = () => {
  const {authUser} = useAuthContext(); // so we could use the user fullname
  console.log(authUser);

    return (
        <div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome {authUser.fullname} 👋</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
    )
}