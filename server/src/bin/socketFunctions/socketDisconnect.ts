import { Socket } from "socket.io";
import { deleteBoard } from "../../utils/deleteBoard";
import mongoose from "mongoose";
import { Message } from "../../../../types";
const Board = mongoose.model("boards");

interface MongoFeedbackBoard {
    _id: string;
    creator: string;
    boardId: string;
    messages: Message[];
    hideVotes: boolean;
    __v: number;
}

// Everyone joins main room for now
export const socketDisconnect = (socket: Socket, io: SocketIO.Server, boardId: string): void => {
    socket.on("disconnect", async () => {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        console.log("user disconnected: ", socket.id);
        if (existingBoard === null) return;
        if (existingBoard.creator === socket.id){
            deleteBoard(boardId, io);
        }
    });
};

