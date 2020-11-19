"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = void 0;
const boardMessageLists_1 = require("./boardMessageLists");
exports.deleteBoard = (boardId, io) => {
    const TIMEOUT = 10 * 1000;
    io.to(boardId).emit("creator-disconnect", {
        msg: "Room creator has disconnected; room will automatically close in 5 minutes. Please download any feedback you wish to keep, as this will be deleted when the room closes",
        timeout: TIMEOUT
    });
    setTimeout((boardId) => {
        delete boardMessageLists_1.boardMessageLists[boardId];
    }, TIMEOUT);
    return;
};
//# sourceMappingURL=deleteBoard.js.map