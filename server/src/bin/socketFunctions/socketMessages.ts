import { Socket } from "socket.io";
import { addIdToMessage } from "../../utils/addIdToMessage";
import { upvoteMessageInDatabase } from "../../utils/upvoteMessageInDatabase";
import { MongoFeedbackBoard, Message } from "../../../../types";
import mongoose from "mongoose";
import { handleSocketError } from "../../errors/handleSocketError";
import { toggleVotes } from "../../utils/toggleVotes";
import { addMessageToDatabase } from "../../utils/addMessageToDatabase";

const Board = mongoose.model("boards");

export const socketMessages = (socket: Socket, io: SocketIO.Server, boardId: string): void => {
    sendInitialStateOfBoard(socket, boardId);
    socketUpvote(socket, io, boardId);
    socketToggleVoteVis(socket, io, boardId);
    socketMessage(socket, io, boardId);
};

export const sendInitialStateOfBoard = async (socket: Socket, boardId: string): Promise<void> => {
    try {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        if (!existingBoard) return;
        socket.emit("toggle-votes", existingBoard.hideVotes);
        socket.emit("message", existingBoard.messages);
    } catch (err: unknown){
        handleSocketError(err, socket);
    }
};

export const socketUpvote = (socket: Socket, io: SocketIO.Server, boardId: string): void  => {
    socket.on("upvote", async ({message, value}: {message: Message, value: number}) => {
        try {
            await upvoteMessageInDatabase(message, value, boardId);
            const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
            io.to(boardId).emit("message", existingBoard.messages);
        } catch (err: unknown) {
            handleSocketError(err, socket);
        }
    });
};

export const socketToggleVoteVis = (socket: Socket, io: SocketIO.Server, boardId: string): void => {
    socket.on("toggle-votes", async () => {
        try {
            const currVal = await toggleVotes(boardId);
            if (currVal instanceof Error) return handleSocketError(currVal, socket);
            io.to(boardId).emit("toggle-votes", !currVal);
        } catch (err: unknown) {
            handleSocketError(err, socket);
        }
    });
};

export const socketMessage = (socket: Socket, io: SocketIO.Server, boardId: string): void => {
    socket.on("message", async (newMessage: {user: string, message: string, upvotes: number }) => {
        const generatedNewMessage: Message | Error = await addIdToMessage(newMessage, boardId);
        if (generatedNewMessage instanceof Error) return handleSocketError(generatedNewMessage, socket);

        try {
            const newMessageList = await addMessageToDatabase(boardId, generatedNewMessage);
            if (newMessageList instanceof Error) return handleSocketError(newMessageList, socket);
            io.to(boardId).emit("message", newMessageList);
        } catch (err: unknown) {
            handleSocketError(err, socket);
        }
    });
};