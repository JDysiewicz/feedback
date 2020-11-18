"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketRooms = void 0;
const boardMessageLists_1 = require("../../utils/boardMessageLists");
exports.socketRooms = (socket, io, boardId) => {
    socket.join(boardId);
    if (boardMessageLists_1.boardMessageLists.filter(messageList => messageList.boardId === boardId).length === 0) {
        const newBoardMessageList = { boardId: boardId, messages: [] };
        boardMessageLists_1.boardMessageLists.push(newBoardMessageList);
    }
};
//# sourceMappingURL=socketRooms.js.map