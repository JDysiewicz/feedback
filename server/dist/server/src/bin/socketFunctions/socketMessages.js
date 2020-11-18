"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketMessages = void 0;
const boardMessageLists_1 = require("../../utils/boardMessageLists");
exports.socketMessages = (socket, io, boardId) => {
    const boardMessageListIdx = boardMessageLists_1.boardMessageLists.findIndex(messageList => messageList.boardId === boardId);
    socket.emit("message", boardMessageLists_1.boardMessageLists[boardMessageListIdx].messages);
    socket.on("upvote", ({ message, value }) => {
        const idx = boardMessageLists_1.boardMessageLists[boardMessageListIdx].messages.findIndex(msg => msg.message === message.message);
        boardMessageLists_1.boardMessageLists[boardMessageListIdx].messages[idx] = Object.assign(Object.assign({}, message), { upvotes: message.upvotes + value });
        io.to(boardId).emit("message", boardMessageLists_1.boardMessageLists[boardMessageListIdx].messages);
    });
    socket.on("message", (newMessage) => {
        boardMessageLists_1.boardMessageLists[boardMessageListIdx].messages.push(newMessage);
        io.to(boardId).emit("message", boardMessageLists_1.boardMessageLists[boardMessageListIdx].messages);
    });
};
//# sourceMappingURL=socketMessages.js.map