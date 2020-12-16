"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketError = void 0;
const SocketError_1 = __importDefault(require("./SocketError"));
exports.handleSocketError = (err, socket) => {
    if (err instanceof Error)
        console.log(new SocketError_1.default(err, err.message));
    if (typeof err === "string")
        console.log(new SocketError_1.default(new Error(err), "Something went wrong"));
    socket.emit("error", "Internal socket error.");
};
//# sourceMappingURL=handleSocketError.js.map