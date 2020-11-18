import { Socket } from "socket.io";
import { socketRooms } from "./socketRooms";
import { socketMessages } from "./socketMessages";

// Wrapper for all socketFunctions via io.on("Connection")
export const socketSetup = (io: SocketIO.Server) => {
    io.on("connection", (socket: Socket) => {
        socketRooms(socket, io);
        socketMessages(socket, io);
    });
};





