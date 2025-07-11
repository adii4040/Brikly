import mongoose, {Schema} from 'mongoose'

const ChatSchema = new Schema({}, {
    timestamps: true
})

const Chat = new mongoose.model('Chat', ChatSchema)

export default Chat