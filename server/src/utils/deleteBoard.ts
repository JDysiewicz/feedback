import { BoardMessageList } from "../../../types";
import { boardMessageLists } from "./boardMessageLists";

export const deleteBoard = (boardIndex: number, io: SocketIO.Server) => {
    const messageList: BoardMessageList = boardMessageLists[boardIndex];
    const TIMEOUT = 10 * 1000;
    io.to(messageList.boardId).emit("creator-disconnect",{
        msg: "Room creator has disconnected; room will automatically close in 5 minutes. Please download any feedback you wish to keep, as this will be deleted when the room closes",
        timeout: TIMEOUT
    });

    setTimeout((boardIndex: number) => {
        // Delete the message list from that room
        boardMessageLists.splice(boardIndex, 1);
    }, TIMEOUT);

    return;
};