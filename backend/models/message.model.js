import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    }
    // createdAt, updatedAt => message.createdAt: 15:30
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;