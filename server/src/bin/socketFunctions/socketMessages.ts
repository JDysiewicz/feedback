import { Socket } from "socket.io";

import { Message } from "../../../../types";

// Message array that holds all messages for now
// Separate this out and make a new array for each room probs
const messageList: Message[] = [];

export const socketMessages = (socket: Socket, io: SocketIO.Server) => {
    
    // When new socket joins, give them the current messageList
    socket.emit("message", messageList);

    // Controls the voting
    socket.on("upvote", ({message, value}) => {
        const idx: number = messageList.findIndex(msg => msg.message === message.message);
        messageList[idx] = {...message, upvotes: message.upvotes+value};
        io.to("main-room").emit("message", messageList);
    });
    
    // Update messageList with newMessage and send the update to everyone
    socket.on("message", (newMessage: Message) => {
        messageList.push(newMessage);
        io.to("main-room").emit("message", messageList);
    });
};
