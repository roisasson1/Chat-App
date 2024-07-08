const Message = () => {
  return (
    <div className="chat chat-end">
        {/* profile image */}
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>

        </div>

        {/* message content */}
        <div className={"chat-bubble text-white bg-blue-500"}>Fuck you!</div>

        {/* time */}
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
    </div>
  )
}

export default Message;