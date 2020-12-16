import { Socket } from "socket.io";
import { socketRooms } from "./socketRooms";
import { socketMessages } from "./socketMessages";
import { socketDisconnect } from "./socketDisconnect";
import { SocketQuery } from "../../../../types";

// Wrapper for all socketFunctions via io.on("Connection")
export const socketSetup = (io: SocketIO.Server): void => {
    io.on("connection", (socket: Socket) => {
        console.log(`User connected! ${socket.id}`);
        const socketQueries: SocketQuery = socket.handshake.query;
        if (socketQueries.board === undefined) return;
        const boardId: string = socketQueries.board;
        console.log("Board ID: ", boardId);
        socketRooms(socket, io, boardId);
        socketMessages(socket, io, boardId);
        socketDisconnect(socket, io, boardId);
    });
};





