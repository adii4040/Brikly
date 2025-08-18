import mongoose, { Schema } from 'mongoose'

const chatSchema = new Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {
    timestamps: true
})

const Chat = new mongoose.model('Chat', chatSchema)

export default Chat