import { io } from 'socket.io-client';


const connectSocket = (authUser) => {


    const socket = io("http://localhost:8000", {
        auth: { authUser }
    })
    if (!authUser || socket?.connected) return

    socket.on("connect", () => {
        console.log("✅ Connected to server with id:", socket.id);
    });

    return socket
}

const disconnectSocket = (socket) => {
    if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
    }
}

export {
    connectSocket,
    disconnectSocket
}