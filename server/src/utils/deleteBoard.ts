import mongoose from "mongoose";

const Board = mongoose.model("boards");

export const deleteBoard = (boardId: string, io: SocketIO.Server): void => {
    const TIMEOUT = 10 * 1000;
    io.to(boardId).emit("creator-disconnect",{
        msg: "Room creator has disconnected; room will automatically close in 5 minutes. Please download any feedback you wish to keep, as this will be deleted when the room closes",
        timeout: TIMEOUT
    });

    setTimeout(async () => {
        // Delete the message list from that room
        await Board.deleteOne({boardId: boardId});
    }, TIMEOUT);
};