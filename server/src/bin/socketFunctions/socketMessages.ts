import { Socket } from "socket.io";
import { addIdToMessage } from "../../utils/addIdToMessage";
import { Message } from "../../../../types";
import mongoose from "mongoose";

// CURRENT KNOWN BUGS - IF SERVER SHUTS OFF, BOARDS ARE NOT DELETED. THEREFORE NO WAY TO DELETE A BOARD IF 
// THE SERVER SHUTS OFF BEFORE ROOM CREATOR LEAVES.

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
    if (!existingBoard) return;
    socket.emit("toggle-votes", existingBoard.hideVotes);
    socket.emit("message", existingBoard.messages);
};

const socketUpvote = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.on("upvote", async ({message, value}: {message: Message, value: number}) => {
        if (value > 0) await Board.updateOne({boardId: boardId, "messages.id": message.id}, {$inc: {"messages.$.upvotes": 1}});
        if (value < 0) await Board.updateOne({boardId: boardId, "messages.id": message.id}, {$inc: {"messages.$.upvotes": -1}});

        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        io.to(boardId).emit("message", existingBoard.messages);
    });
};

const socketToggleVoteVis = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.on("toggle-votes", async () => {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        const currVal = existingBoard.hideVotes;
        await Board.updateOne({boardId: boardId}, {$set: {hideVotes: !currVal}});
        io.to(boardId).emit("toggle-votes", !currVal);
    });
};

const socketMessage = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.on("message", async (newMessage: {user: string, message: string, upvotes: number }) => {
        const generatedNewMessage: Message | Error = await addIdToMessage(newMessage, boardId);
        if (generatedNewMessage instanceof Error) {
            socket.emit("error", generatedNewMessage.message);
            return;
        }

        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        const newMessageList = [...existingBoard.messages, generatedNewMessage];
        await Board.updateOne({boardId: boardId}, {$set: {messages: newMessageList}});
        io.to(boardId).emit("message", newMessageList);
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
