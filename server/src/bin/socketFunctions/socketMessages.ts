import { Socket } from "socket.io";
import { boardMessageLists } from "../../utils/boardMessageLists";
import { addIdToMessage } from "../../utils/addIdToMessage";
import { Message } from "../../../../types";

// Message array that holds all messages for now
// Separate this out and make a new array for each room probs


export const socketMessages = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    const boardMessageListIdx = boardMessageLists.findIndex(messageList => messageList.boardId === boardId);
    console.log(boardMessageLists[boardMessageListIdx].hideVotes);
    // When new socket joins, give them the current messageList
    socket.emit("initial-vote-visibility", boardMessageLists[boardMessageListIdx].hideVotes);
    socket.emit("message", boardMessageLists[boardMessageListIdx].messages);
    
    // Controls the voting
    socket.on("upvote", ({message, value}: {message: Message, value: number}) => {
        const idx: number = boardMessageLists[boardMessageListIdx].messages.findIndex(msg => msg.id === message.id);
        boardMessageLists[boardMessageListIdx].messages[idx] = {...message, upvotes: message.upvotes+value};
        io.to(boardId).emit("message", boardMessageLists[boardMessageListIdx].messages);
    });

    socket.on("toggle-votes", () => {
        boardMessageLists[boardMessageListIdx].hideVotes = !boardMessageLists[boardMessageListIdx].hideVotes
        io.emit("toggle-votes");
    });
    
    // Update messageList with newMessage and send the update to everyone
    socket.on("message", (newMessage: {user: string, message: string, upvotes: number }) => {
        const generatedNewMessage: Message = addIdToMessage(newMessage, boardMessageListIdx)
        boardMessageLists[boardMessageListIdx].messages.push(generatedNewMessage);
        io.to(boardId).emit("message", boardMessageLists[boardMessageListIdx].messages);
    });
};
