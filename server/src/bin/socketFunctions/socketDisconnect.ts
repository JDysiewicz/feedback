import { Socket } from "socket.io";
import { boardMessageLists } from "../../utils/boardMessageLists";
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
export const socketDisconnect = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.on("disconnect", async () => {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        console.log("user disconnected: ", socket.id);
        if (existingBoard === null) return;
        if (existingBoard.creator === socket.id){
            await Board.deleteOne({boardId: boardId});
        }
        // Issues surrounding a board being deleted before people left, it being deleted from memory, then others disconnecting from it
        // caused it to error out on boardMessageLists[boardId].creator as boardMessageLists[boardId] was undefined
        // therefore this check is here as a safety net to prevent crash of server.
        if (boardMessageLists[boardId] !== undefined){
            if (boardMessageLists[boardId].creator === socket.id){
                // Delete board; tell all users that socket will disconnect in 1 min; disconnect all sockets
                // in that room (chance to save data), then redirect all to the main page saying "Room admin disconnected"
                deleteBoard(boardId, io);
            }
        }
    });
};

