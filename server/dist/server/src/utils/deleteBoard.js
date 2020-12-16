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
exports.deleteBoard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Board = mongoose_1.default.model("boards");
exports.deleteBoard = (boardId, io) => {
    const TIMEOUT = 10 * 1000;
    io.to(boardId).emit("creator-disconnect", {
        msg: "Room creator has disconnected; room will automatically close in 5 minutes. Please download any feedback you wish to keep, as this will be deleted when the room closes",
        timeout: TIMEOUT
    });
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Board.remove({ boardId: boardId });
    }), TIMEOUT);
};
//# sourceMappingURL=deleteBoard.js.map