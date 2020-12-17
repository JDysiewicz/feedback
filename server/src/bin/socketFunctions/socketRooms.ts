import { Socket } from "socket.io";
import mongoose from "mongoose";
import { handleSocketError } from "../../errors/handleSocketError";
import { createNewBoard } from "../../utils/createNewBoard";
import { MongoFeedbackBoard } from "../../../../types";

const Board = mongoose.model("boards");

export const socketRooms = async (socket: Socket, io: SocketIO.Server, boardId: string): Promise<void> => {
    socket.join(boardId);
    try {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;

        // If the room is freshly created, create an entry for it in db
        if (!existingBoard) {
            await createNewBoard(socket.id, boardId);
        }
    } catch (err) {
        handleSocketError(err, socket);
    }
};

