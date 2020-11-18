import { Socket } from "socket.io";
import { socketRooms } from "./socketRooms";
import { socketMessages } from "./socketMessages";

interface SocketQuery{
    EIO?: string;
    transport?: string;
    t?: string;
    board?: string;
}

// Wrapper for all socketFunctions via io.on("Connection")
export const socketSetup = (io: SocketIO.Server) => {
    io.on("connection", (socket: Socket) => {
        const socketQueries: SocketQuery = socket.handshake.query;
        if (socketQueries.board === undefined) return;
        const boardId: string = socketQueries.board;
        socketRooms(socket, io, boardId);
        socketMessages(socket, io, boardId);
    });
};





