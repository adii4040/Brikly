import Message from '../Models/Message.model.js'
import User from '../Models/User.model.js'
import Chat from '../Models/Chat.model.js'
import { asyncHandler, ApiError, ApiResponse } from '../Utils/index.js'

const createMessage = asyncHandler(async (req, res) => {
    const { text } = req.body
    const { receiverId } = req.params

    if (!receiverId) throw new ApiError(401, 'No receiver id is provided.')

    const myId = req.user._id
    const message = await Message.create({
        senderId: myId,
        receiverId,
        text
    })
    const existingChat = await Chat.findOne({
        $or: [
            { senderId: myId, receiverId },
            { senderId: receiverId, receiverId: myId }
        ]
    })
    if (!existingChat) {
        await Chat.create({
            senderId: myId,
            receiverId
        })
    }


    const sendMessage = await Message.findById(message._id).populate("senderId", "fullname avatar").populate("receiverId", "fullname avatar")

    return res.status(201).json(
        new ApiResponse(
            201,
            { message: sendMessage },
            'message sent successfully'
        )
    )

})


const getMessages = asyncHandler(async (req, res) => {
    const { receiverId } = req.params
    const receiver = await User.findById(receiverId)
    if (!receiver) throw new ApiError(404, "No receiver found!")
    const myId = req.user._id
    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId },
            { senderId: receiverId, receiverId: myId }
        ]
    }).populate("senderId", "fullname avatar").populate("receiverId", "fullname avatar")
    if (!messages.length) throw new ApiError(404, `You have no conversation with ${receiver.fullname}.`)

    return res.status(200).json(
        new ApiResponse(
            200,
            { messages },
            "All the messages are fetched successfully."
        )
    )
})


const getMyChats = asyncHandler(async (req, res) => {
    const myId = req.user._id
    const chats = await Chat.find({
        $or: [
            { senderId: myId },
            { receiverId: myId }
        ]
    }).populate("senderId", "fullname avatar").populate("receiverId", "fullname avatar")

    if (!chats.length) throw new ApiError(404, "You have no chats yet.")

    return res.status(200).json(
        new ApiResponse(
            200,
            { chats },
            "All the chats are fetched successfully."
        )
    )
})


export {
    createMessage,
    getMessages,
    getMyChats
}

