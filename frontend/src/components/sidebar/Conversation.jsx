import useConversation from "../../hooks/zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({conversation, lastIdx}) => {

    // hook - change the selected conversation fields from useConversation function
    const {selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;

    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id); // user online/offline

  return (
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
	    ${isSelected ? "bg-sky-500" : ""}`}
		onClick={() => setSelectedConversation(conversation)} >

        {/* avatar picture */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-14 rounded-full">
                <img src={conversation.profilePic}
                alt="user avatar" />
            </div>
        </div>

        { /* avatar picture offline */
        /* <div className="avatar offline">
            <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div> */}

        {/* conversation name */}
        <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
                <p className="font-bold text-gray-200">{conversation.fullname}</p>
            </div>
        </div>

        {/* Divider line not working right now*/}
        {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </div>
  )
}

export default Conversation;