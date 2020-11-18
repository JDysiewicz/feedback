import { Socket } from "socket.io";

// Everyone joins main room for now
export const socketRooms = (socket: Socket, io: SocketIO.Server) => {
    socket.join("main-room");
};

