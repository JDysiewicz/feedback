import { Socket } from "socket.io";
import { Message, BoardMessageList } from "../../../../types";
import mongoose from "mongoose";
const Board = mongoose.model("boards");

interface MongoFeedbackBoard {
    _id: string;
    creator: string;
    boardId: string;
    messages: Message[];
    hideVotes: boolean;
    __v: number;
}

export const socketRooms = async (socket: Socket, io: SocketIO.Server, boardId: string) => {

    // Join the room which socket id matches

    socket.join(boardId);

    const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;

    // If the room is freshly created, create the info about it in memory
    if (!existingBoard) {
        const newBoardMessageList: BoardMessageList = {creator: socket.id, boardId: boardId, messages: [] as Message[], hideVotes: true};
        await new Board(newBoardMessageList).save();
    }
};

