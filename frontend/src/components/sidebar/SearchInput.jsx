import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";

import useConversation from "../../hooks/zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";


const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setSelectedConversation} = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    // if event not get explicitly handled, default action should not be taken
    e.preventDefault();

    if (!search) return;
    if (search.length < 3) {
      return toast.error('Search query should be at least 3 characters long');
    }

    const conversationFound = conversations.find((c) =>
      c.fullname.toLowerCase().includes(search.toLowerCase()));

    if (conversationFound) {
      setSelectedConversation(conversationFound);
      setSearch('');
    } else {
      toast.error('No such user found!');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input type="text" placeholder='Search...'
                        className=' input input-bordered rounded-full'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}/>
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp className="w-6 h-6 outline-none"/>
        </button>
    </form>
  )
}

export default SearchInput;