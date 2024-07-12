import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({message}) => {
  // check if the messsage is from us or from other user
  const { authUser } = useAuthContext(); // the authenticated user we get from context
  const { selectedConversation } = useConversation(); // the selected conversation we get from zustand
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);

  // if the message is from us, use 'chat-end' class to align it to the right,
  // otherwise, use 'chat-start' class to align it to the left
  const chatClassName = fromMe? 'chat-end' : 'chat-start';
  const profilePicSelector = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  const bubbleBgColorSelector = fromMe? 'bg-blue-500' : '';

  return (
    <div className={`chat ${chatClassName}`}>
        {/* profile image */}
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component"
                src={profilePicSelector} />
            </div>

        </div>

        {/* message content */}
        <div className={`chat-bubble text-white ${bubbleBgColorSelector}`}>
          {message.message}
          </div>

        {/* time */}
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}</div>
    </div>
  )
}

export default Message;