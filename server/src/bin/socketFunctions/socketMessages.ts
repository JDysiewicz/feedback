import { Socket } from "socket.io";
import { boardMessageLists } from "../../utils/boardMessageLists";
import { Message } from "../../../../types";

// Message array that holds all messages for now
// Separate this out and make a new array for each room probs


export const socketMessages = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    const boardMessageListIdx = boardMessageLists.findIndex(messageList => messageList.boardId === boardId);
    // When new socket joins, give them the current messageList
    socket.emit("message", boardMessageLists[boardMessageListIdx].messages);

    // Controls the voting
    socket.on("upvote", ({message, value}) => {
        const idx: number = boardMessageLists[boardMessageListIdx].messages.findIndex(msg => msg.message === message.message);
        boardMessageLists[boardMessageListIdx].messages[idx] = {...message, upvotes: message.upvotes+value};
        io.to(boardId).emit("message", boardMessageLists[boardMessageListIdx].messages);
    });
    
    // Update messageList with newMessage and send the update to everyone
    socket.on("message", (newMessage: Message) => {
        boardMessageLists[boardMessageListIdx].messages.push(newMessage);
        io.to(boardId).emit("message", boardMessageLists[boardMessageListIdx].messages);
    });
};
