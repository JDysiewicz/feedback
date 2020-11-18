"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
const http = require("http");
const index_1 = __importDefault(require("../index"));
const index_2 = require("./socketFunctions/index");
const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:3000";
const PORT = process.env.PORT || 5000;
const server = http.createServer(index_1.default);
const io = socketio(server, { cors: { origin: SOCKET_URL, methods: ["GET", "POST"] } });
index_2.socketSetup(io);
server.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map