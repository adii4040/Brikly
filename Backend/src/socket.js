import { Server } from 'socket.io'
import { createServer } from 'http'
import { app } from './app.js'


const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

const connectedUsers = new Map();

io.on("connection", (socket) => {
    console.log(`User with id: ${socket.id} connected`)
    const authUser = socket.handshake.auth?.authUser
    console.log(
        "Authenticated User ID:", authUser?._id, "Authenticated Username:", authUser?.fullname
    )
    if (!authUser) return;
    connectedUsers[authUser?._id] = socket.id;
    console.log(connectedUsers)

    socket.on("disconnect", () => {
        console.log(`User with id: ${socket.id} disconnected`)
        connectedUsers[authUser?._id] = null;
        console.log(connectedUsers)
    })



})


export { io, server }