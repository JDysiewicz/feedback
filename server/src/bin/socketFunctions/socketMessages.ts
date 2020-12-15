import { Socket } from "socket.io";
import { boardMessageLists } from "../../utils/boardMessageLists";
import { addIdToMessage } from "../../utils/addIdToMessage";
import { Message } from "../../../../types";
import mongoose from "mongoose";

interface MongoFeedbackBoard {
    _id: string;
    creator: string;
    boardId: string;
    messages: Message[];
    hideVotes: boolean;
    __v: number;
}

const Board = mongoose.model("boards");

const sendInitialStateOfBoard = async (socket: Socket, boardId: string) => {
    const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
    socket.emit("toggle-votes", existingBoard.hideVotes);
    socket.emit("message", existingBoard.messages);
};

const socketUpvote = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.on("upvote", async ({message, value}: {message: Message, value: number}) => {
        if (value > 0) await Board.update({boardId: boardId, "messages.id": message.id}, {$inc: {"messages.$.upvotes": 1}});
        if (value < 0) await Board.update({boardId: boardId, "messages.id": message.id}, {$inc: {"messages.$.upvotes": -1}});
        

        const idx: number = boardMessageLists[boardId].messages.findIndex(msg => msg.id === message.id);
        boardMessageLists[boardId].messages[idx] = {...message, upvotes: message.upvotes+value};

        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        console.log(`---------upvote----------- ${existingBoard}`);
        io.to(boardId).emit("message", boardMessageLists[boardId].messages);
    });
};

const socketToggleVoteVis = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.on("toggle-votes", async () => {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        const currVal = existingBoard.hideVotes;
        await Board.updateOne({boardId: boardId}, {$set: {hideVotes: !currVal}});
        boardMessageLists[boardId].hideVotes = !boardMessageLists[boardId].hideVotes;
        io.to(boardId).emit("toggle-votes", boardMessageLists[boardId].hideVotes);
    });
};

const socketMessage = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.on("message", async (newMessage: {user: string, message: string, upvotes: number }) => {
        const generatedNewMessage: Message | Error = addIdToMessage(newMessage, boardId);
        if (generatedNewMessage instanceof Error) {
            socket.emit("error", generatedNewMessage.message);
            return;
        } else {
            boardMessageLists[boardId].messages.push(generatedNewMessage);
            io.to(boardId).emit("message", boardMessageLists[boardId].messages);
        }
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        const newMessageList = [...existingBoard.messages, generatedNewMessage];
        await Board.updateOne({boardId: boardId}, {$set: {messages: newMessageList}});
    });
};

export const socketMessages = async (socket: Socket, io: SocketIO.Server, boardId: string) => {
    
    // When new socket joins, give them the current messageList
    sendInitialStateOfBoard(socket, boardId);
    
    // Controls the upvoting
    socketUpvote(socket, io, boardId);
    socketToggleVoteVis(socket, io, boardId);
    socketMessage(socket, io, boardId);
    // Voting visibility toggle

    
    // Update messageList with newMessage and send the update to everyone
    // Sending the entire message list isnt very extensible, should be fine for smaller scale usages (<100)
    // however can't currently test with that many users. Will see how it goes in trial runs.

};
