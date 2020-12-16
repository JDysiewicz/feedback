import { Socket } from "socket.io";
import { addIdToMessage } from "../../utils/addIdToMessage";
import { MongoFeedbackBoard, Message } from "../../../../types";
import mongoose from "mongoose";
import { handleSocketError } from "../../errors/handleSocketError";

const Board = mongoose.model("boards");

export const socketMessages = (socket: Socket, io: SocketIO.Server, boardId: string): void => {
    sendInitialStateOfBoard(socket, boardId);
    socketUpvote(socket, io, boardId);
    socketToggleVoteVis(socket, io, boardId);
    socketMessage(socket, io, boardId);
};

const sendInitialStateOfBoard = async (socket: Socket, boardId: string) => {
    try {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        if (!existingBoard) return;
        socket.emit("toggle-votes", existingBoard.hideVotes);
        socket.emit("message", existingBoard.messages);
    } catch (err: unknown){
        handleSocketError(err, socket);
    }
};

const socketUpvote = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.on("upvote", async ({message, value}: {message: Message, value: number}) => {
        try {
            if (value > 0) await Board.updateOne({boardId: boardId, "messages.id": message.id}, {$inc: {"messages.$.upvotes": 1}});
            if (value < 0) await Board.updateOne({boardId: boardId, "messages.id": message.id}, {$inc: {"messages.$.upvotes": -1}});
    
            const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
            io.to(boardId).emit("message", existingBoard.messages);
        } catch (err: unknown) {
            handleSocketError(err, socket);
        }
    });
};

const socketToggleVoteVis = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.on("toggle-votes", async () => {
        try {
            const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
            const currVal = existingBoard.hideVotes;
            await Board.updateOne({boardId: boardId}, {$set: {hideVotes: !currVal}});
            io.to(boardId).emit("toggle-votes", !currVal);
        } catch (err: unknown) {
            handleSocketError(err, socket);
        }
    });
};

const socketMessage = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.on("message", async (newMessage: {user: string, message: string, upvotes: number }) => {
        const generatedNewMessage: Message | Error = await addIdToMessage(newMessage, boardId);
        if (generatedNewMessage instanceof Error) {
            socket.emit("error", generatedNewMessage.message);
            return;
        }
        try {
            const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
            const newMessageList = [...existingBoard.messages, generatedNewMessage];
            await Board.updateOne({boardId: boardId}, {$set: {messages: newMessageList}});
            io.to(boardId).emit("message", newMessageList);
        } catch (err: unknown) {
            handleSocketError(err, socket);
        }
    });
};