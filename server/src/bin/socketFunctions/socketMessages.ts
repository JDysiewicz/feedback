import { Socket } from "socket.io";
import { boardMessageLists } from "../../utils/boardMessageLists";
import { addIdToMessage } from "../../utils/addIdToMessage";
import { Message } from "../../../../types";

// Message array that holds all messages for now
// Separate this out and make a new array for each room probs


export const socketMessages = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    // When new socket joins, give them the current messageList
    socket.emit("initial-vote-visibility", boardMessageLists[boardId].hideVotes);
    socket.emit("message", boardMessageLists[boardId].messages);
    
    // Controls the voting
    socket.on("upvote", ({message, value}: {message: Message, value: number}) => {
        const idx: number = boardMessageLists[boardId].messages.findIndex(msg => msg.id === message.id);
        boardMessageLists[boardId].messages[idx] = {...message, upvotes: message.upvotes+value};
        io.to(boardId).emit("message", boardMessageLists[boardId].messages);
    });

    socket.on("toggle-votes", () => {
        boardMessageLists[boardId].hideVotes = !boardMessageLists[boardId].hideVotes
        io.to(boardId).emit("toggle-votes");
    });
    
    // Update messageList with newMessage and send the update to everyone
    socket.on("message", (newMessage: {user: string, message: string, upvotes: number }) => {
        const generatedNewMessage: Message | Error = addIdToMessage(newMessage, boardId);
        if (generatedNewMessage instanceof Error) {
            socket.emit("error", generatedNewMessage.message);
            return;
        } else {
            boardMessageLists[boardId].messages.push(generatedNewMessage);
            io.to(boardId).emit("message", boardMessageLists[boardId].messages);
        }
    });
};
