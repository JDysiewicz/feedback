import { BoardMessageList } from "../../../types";
import { boardMessageLists } from "./boardMessageLists";

export const deleteBoard = (boardId: string, io: SocketIO.Server) => {
    const messageList: BoardMessageList = boardMessageLists[boardId];
    const TIMEOUT = 10 * 1000;
    io.to(messageList.boardId).emit("creator-disconnect",{
        msg: "Room creator has disconnected; room will automatically close in 5 minutes. Please download any feedback you wish to keep, as this will be deleted when the room closes",
        timeout: TIMEOUT
    });

    setTimeout((boardId: string) => {
        // Delete the message list from that room
        delete boardMessageLists[boardId];
    }, TIMEOUT);

    return;
};