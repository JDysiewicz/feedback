"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketDisconnect = void 0;
const boardMessageLists_1 = require("../../utils/boardMessageLists");
const deleteBoard_1 = require("../../utils/deleteBoard");
exports.socketDisconnect = (socket, io, boardId) => {
    socket.on("disconnect", () => {
        console.log("user disconnected: ", socket.id);
        if (boardMessageLists_1.boardMessageLists[boardId] !== undefined) {
            if (boardMessageLists_1.boardMessageLists[boardId].creator === socket.id) {
                deleteBoard_1.deleteBoard(boardId, io);
            }
        }
    });
};
//# sourceMappingURL=socketDisconnect.js.map