"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketSetup = void 0;
const socketRooms_1 = require("./socketRooms");
const socketMessages_1 = require("./socketMessages");
exports.socketSetup = (io) => {
    io.on("connection", (socket) => {
        const socketQueries = socket.handshake.query;
        if (socketQueries.board === undefined)
            return;
        const boardId = socketQueries.board;
        socketRooms_1.socketRooms(socket, io, boardId);
        socketMessages_1.socketMessages(socket, io, boardId);
    });
};
//# sourceMappingURL=index.js.map