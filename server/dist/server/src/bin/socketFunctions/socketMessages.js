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
exports.socketMessages = void 0;
const addIdToMessage_1 = require("../../utils/addIdToMessage");
const mongoose_1 = __importDefault(require("mongoose"));
const handleSocketError_1 = require("../../errors/handleSocketError");
const Board = mongoose_1.default.model("boards");
exports.socketMessages = (socket, io, boardId) => {
    sendInitialStateOfBoard(socket, boardId);
    socketUpvote(socket, io, boardId);
    socketToggleVoteVis(socket, io, boardId);
    socketMessage(socket, io, boardId);
};
const sendInitialStateOfBoard = (socket, boardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingBoard = yield Board.findOne({ boardId: boardId });
        if (!existingBoard)
            return;
        socket.emit("toggle-votes", existingBoard.hideVotes);
        socket.emit("message", existingBoard.messages);
    }
    catch (err) {
        handleSocketError_1.handleSocketError(err, socket);
    }
});
const socketUpvote = (socket, io, boardId) => {
    socket.on("upvote", ({ message, value }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (value > 0)
                yield Board.updateOne({ boardId: boardId, "messages.id": message.id }, { $inc: { "messages.$.upvotes": 1 } });
            if (value < 0)
                yield Board.updateOne({ boardId: boardId, "messages.id": message.id }, { $inc: { "messages.$.upvotes": -1 } });
            const existingBoard = yield Board.findOne({ boardId: boardId });
            io.to(boardId).emit("message", existingBoard.messages);
        }
        catch (err) {
            handleSocketError_1.handleSocketError(err, socket);
        }
    }));
};
const socketToggleVoteVis = (socket, io, boardId) => {
    socket.on("toggle-votes", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingBoard = yield Board.findOne({ boardId: boardId });
            const currVal = existingBoard.hideVotes;
            yield Board.updateOne({ boardId: boardId }, { $set: { hideVotes: !currVal } });
            io.to(boardId).emit("toggle-votes", !currVal);
        }
        catch (err) {
            handleSocketError_1.handleSocketError(err, socket);
        }
    }));
};
const socketMessage = (socket, io, boardId) => {
    socket.on("message", (newMessage) => __awaiter(void 0, void 0, void 0, function* () {
        const generatedNewMessage = yield addIdToMessage_1.addIdToMessage(newMessage, boardId);
        if (generatedNewMessage instanceof Error) {
            socket.emit("error", generatedNewMessage.message);
            return;
        }
        try {
            const existingBoard = yield Board.findOne({ boardId: boardId });
            const newMessageList = [...existingBoard.messages, generatedNewMessage];
            yield Board.updateOne({ boardId: boardId }, { $set: { messages: newMessageList } });
            io.to(boardId).emit("message", newMessageList);
        }
        catch (err) {
            handleSocketError_1.handleSocketError(err, socket);
        }
    }));
};
//# sourceMappingURL=socketMessages.js.map