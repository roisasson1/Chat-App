import { useState } from 'react';
import { BsSend } from 'react-icons/bs';

import useSendMessage from '../../hooks/useSendMessage';


const MessageInput = () => {
  const [message, setMessage] = useState('');
  const {loading, sendMessage } = useSendMessage(); // hook

  const handleSubmit = async (e) => {
    // if event not get explicitly handled, default action should not be taken
    e.preventDefault();

    // if message is empty, do nothing
    if (!message) return;

    await sendMessage(message); // send the message to the server
    setMessage(''); // clear the input field after sending the message
  }

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full relative">
            { /* message input */}
            <input type='text'
            className='border text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 text-black'
            placeholder='Send a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}/>

            { /* send button */}
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                {loading ? <span className="loading loading-spinner"></span> : <BsSend />}
            </button>
        </div>
    </form>
  )
}

export default MessageInput;