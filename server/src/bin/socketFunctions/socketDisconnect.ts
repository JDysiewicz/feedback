import { Socket } from "socket.io";
import { boardMessageLists } from "../../utils/boardMessageLists";
import { deleteBoard } from "../../utils/deleteBoard";
import { BoardMessageList } from "../../../../types";

// Everyone joins main room for now
export const socketDisconnect = (socket: Socket, io: SocketIO.Server) => {
    socket.on("disconnect", () => {
        console.log("user disconnected: ", socket.id);
        const boardCreatorIndex = boardMessageLists.findIndex((messageList: BoardMessageList) => messageList.creator === socket.id);
        if (boardCreatorIndex !== -1){
            // Delete board; tell all users that socket will disconnect in 1 min; disconnect all sockets
            // in that room (chance to save data), then redirect all to the main page saying "Room admin disconnected"
            deleteBoard(boardCreatorIndex, io);
        }
    });
};

