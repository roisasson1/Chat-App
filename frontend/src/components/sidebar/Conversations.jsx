import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";


const Conversations = () => {
  const {loading, conversations} = useGetConversations(); // Fetch conversations from API
  console.log("CONVERSATIONS:", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
        {/* Map through conversations and render Conversation component for each */}
        {/* Add lastIdx prop to last conversation to avoid border-bottom */}
        {conversations.map((conversation, idx) => (
          <Conversation key={conversation.id} 
          conversation={conversation}
          lastIdx={idx === conversations.length - 1} />
        ))}
        {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  )
}

export default Conversations;