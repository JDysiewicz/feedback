"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketRooms = void 0;
const boardMessageLists_1 = require("../../utils/boardMessageLists");
exports.socketRooms = (socket, io, boardId) => {
    socket.join(boardId);
    if (!boardMessageLists_1.boardMessageLists[boardId]) {
        const newBoardMessageList = { creator: socket.id, boardId: boardId, messages: [], hideVotes: true };
        boardMessageLists_1.boardMessageLists[boardId] = newBoardMessageList;
    }
};
//# sourceMappingURL=socketRooms.js.map