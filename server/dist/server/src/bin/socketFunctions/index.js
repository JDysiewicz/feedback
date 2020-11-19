"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketSetup = void 0;
const socketRooms_1 = require("./socketRooms");
const socketMessages_1 = require("./socketMessages");
const socketDisconnect_1 = require("./socketDisconnect");
exports.socketSetup = (io) => {
    io.on("connection", (socket) => {
        console.log(`User connected! ${socket.id}`);
        const socketQueries = socket.handshake.query;
        if (socketQueries.board === undefined)
            return;
        const boardId = socketQueries.board;
        socketRooms_1.socketRooms(socket, io, boardId);
        socketMessages_1.socketMessages(socket, io, boardId);
        socketDisconnect_1.socketDisconnect(socket, io, boardId);
    });
};
//# sourceMappingURL=index.js.map