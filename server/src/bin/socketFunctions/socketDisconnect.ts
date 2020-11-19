import { Socket } from "socket.io";
import { boardMessageLists } from "../../utils/boardMessageLists";
import { deleteBoard } from "../../utils/deleteBoard";

// Everyone joins main room for now
export const socketDisconnect = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.on("disconnect", () => {
        console.log("user disconnected: ", socket.id);
        
        if (boardMessageLists[boardId].creator === socket.id){
            // Delete board; tell all users that socket will disconnect in 1 min; disconnect all sockets
            // in that room (chance to save data), then redirect all to the main page saying "Room admin disconnected"
            deleteBoard(boardId, io);
        }
    });
};

