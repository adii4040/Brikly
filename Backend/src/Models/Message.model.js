import mongoose, {Schema} from 'mongoose'

const MessageSchema = new Schema({}, {
    timestamps: true
})

const Message = new mongoose.model('Message', MessageSchema)

export default Message