"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketMessages = void 0;
const boardMessageLists_1 = require("../../utils/boardMessageLists");
const addIdToMessage_1 = require("../../utils/addIdToMessage");
exports.socketMessages = (socket, io, boardId) => {
    socket.emit("toggle-votes", boardMessageLists_1.boardMessageLists[boardId].hideVotes);
    socket.emit("message", boardMessageLists_1.boardMessageLists[boardId].messages);
    socket.on("upvote", ({ message, value }) => {
        const idx = boardMessageLists_1.boardMessageLists[boardId].messages.findIndex(msg => msg.id === message.id);
        boardMessageLists_1.boardMessageLists[boardId].messages[idx] = Object.assign(Object.assign({}, message), { upvotes: message.upvotes + value });
        io.to(boardId).emit("message", boardMessageLists_1.boardMessageLists[boardId].messages);
    });
    socket.on("toggle-votes", () => {
        boardMessageLists_1.boardMessageLists[boardId].hideVotes = !boardMessageLists_1.boardMessageLists[boardId].hideVotes;
        io.to(boardId).emit("toggle-votes", boardMessageLists_1.boardMessageLists[boardId].hideVotes);
    });
    socket.on("message", (newMessage) => {
        const generatedNewMessage = addIdToMessage_1.addIdToMessage(newMessage, boardId);
        if (generatedNewMessage instanceof Error) {
            socket.emit("error", generatedNewMessage.message);
            return;
        }
        else {
            boardMessageLists_1.boardMessageLists[boardId].messages.push(generatedNewMessage);
            io.to(boardId).emit("message", boardMessageLists_1.boardMessageLists[boardId].messages);
        }
    });
};
//# sourceMappingURL=socketMessages.js.map