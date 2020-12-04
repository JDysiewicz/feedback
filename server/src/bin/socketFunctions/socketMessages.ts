import { Socket } from "socket.io";
import { boardMessageLists } from "../../utils/boardMessageLists";
import { addIdToMessage } from "../../utils/addIdToMessage";
import { Message } from "../../../../types";

export const socketMessages = (socket: Socket, io: SocketIO.Server, boardId: string) => {

    // When new socket joins, give them the current messageList
    socket.emit("toggle-votes", boardMessageLists[boardId].hideVotes);
    socket.emit("message", boardMessageLists[boardId].messages);
    
    // Controls the upvoting
    socket.on("upvote", ({message, value}: {message: Message, value: number}) => {
        const idx: number = boardMessageLists[boardId].messages.findIndex(msg => msg.id === message.id);
        boardMessageLists[boardId].messages[idx] = {...message, upvotes: message.upvotes+value};
        io.to(boardId).emit("message", boardMessageLists[boardId].messages);
    });

    // Voting visibility toggle
    socket.on("toggle-votes", () => {
        boardMessageLists[boardId].hideVotes = !boardMessageLists[boardId].hideVotes;
        io.to(boardId).emit("toggle-votes", boardMessageLists[boardId].hideVotes);
    });
    
    // Update messageList with newMessage and send the update to everyone
    // Sending the entire message list isnt very extensible, should be fine for smaller scale usages (<100)
    // however can't currently test with that many users. Will see how it goes in trial runs.
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
