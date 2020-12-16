import { Socket } from "socket.io";
import { deleteBoard } from "../../utils/deleteBoard";
import mongoose from "mongoose";
import { MongoFeedbackBoard } from "../../../../types";
import { handleSocketError } from "../../errors/handleSocketError";

const Board = mongoose.model("boards");

// CURRENT KNOWN BUGS - IF SERVER SHUTS OFF, BOARDS ARE NOT DELETED. THEREFORE NO WAY TO DELETE A BOARD IF 
// THE SERVER SHUTS OFF BEFORE ROOM CREATOR LEAVES.

export const socketDisconnect = (socket: Socket, io: SocketIO.Server, boardId: string): void => {
    socket.on("disconnect", async () => {
        try {
            const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
            console.log("user disconnected: ", socket.id);
            if (existingBoard === null) return;
            if (existingBoard.creator === socket.id){
                deleteBoard(boardId, io);
            }
        } catch (err: unknown) {
            handleSocketError(err, socket);
        }
    });
};

