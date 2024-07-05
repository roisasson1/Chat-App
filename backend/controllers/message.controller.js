import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body; // get the message from user as input
        const {id: recieverId} = req.params; // get the recieverId from the url
        const senderId = req.user._id;

        // find a conversation where participants array includes senderId and recieverId
        let conversation = await Conversation.findOneAndUpdate({
            participants: {$all: [senderId, recieverId]}
        });

        // if there is no conversation - create it
        // if there are no messages in conversationSchema (default: [])
        if (!conversation) {
            conversation = await Conversation({ 
                participants: [senderId, recieverId]
            });
        }

        // then create a new message and add it to the messages array
        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}