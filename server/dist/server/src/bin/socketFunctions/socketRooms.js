"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketRooms = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const handleSocketError_1 = require("../../errors/handleSocketError");
const Board = mongoose_1.default.model("boards");
exports.socketRooms = (socket, io, boardId) => __awaiter(void 0, void 0, void 0, function* () {
    socket.join(boardId);
    try {
        const existingBoard = yield Board.findOne({ boardId: boardId });
        if (!existingBoard) {
            const newBoardMessageList = { creator: socket.id, boardId: boardId, messages: [], hideVotes: true };
            yield new Board(newBoardMessageList).save();
        }
    }
    catch (err) {
        handleSocketError_1.handleSocketError(err, socket);
    }
});
//# sourceMappingURL=socketRooms.js.map