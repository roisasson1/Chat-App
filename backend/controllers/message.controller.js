import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body; // get the message from user as input
        const {id: recieverId} = req.params; // get the recieverId from the url
        const senderId = req.user._id;

        // find a conversation where participants array includes senderId and recieverId
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, recieverId]}
        });

        // if there is no conversation - create it
        // if there are no messages in conversationSchema (default: [])
        if (!conversation) {
            conversation = await Conversation.create({ 
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

        // save the conversation and the new message in the database
        await conversation.save();
        await newMessage.save();
        // this will run the function above in parallel
        // await Promise.all(conversation.save(), newMessage.save());

        // SOCKET IO FUNCTIONALITY HERE
        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            // send the event only to this user (specific client)
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }


        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        // the url includes the user id
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate("messages"); // show each message content - not reference but actual message

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}