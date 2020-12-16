import { Socket } from "socket.io";
import { Message, BoardMessageList, MongoFeedbackBoard } from "../../../../types";
import mongoose from "mongoose";
import { handleSocketError } from "../../errors/handleSocketError";

const Board = mongoose.model("boards");

export const socketRooms = async (socket: Socket, io: SocketIO.Server, boardId: string): Promise<void> => {
    socket.join(boardId);
    try {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;

        // If the room is freshly created, create an entry for it in db
        if (!existingBoard) {
            const newBoardMessageList: BoardMessageList = {creator: socket.id, boardId: boardId, messages: [] as Message[], hideVotes: true};
            await new Board(newBoardMessageList).save();
        }
    } catch (err) {
        handleSocketError(err, socket);
    }
};

