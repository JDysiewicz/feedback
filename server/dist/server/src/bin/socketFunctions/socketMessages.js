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
exports.socketMessage = exports.socketToggleVoteVis = exports.socketUpvote = exports.sendInitialStateOfBoard = exports.socketMessages = void 0;
const addIdToMessage_1 = require("../../utils/addIdToMessage");
const upvoteMessageInDatabase_1 = require("../../utils/upvoteMessageInDatabase");
const mongoose_1 = __importDefault(require("mongoose"));
const handleSocketError_1 = require("../../errors/handleSocketError");
const toggleVotes_1 = require("../../utils/toggleVotes");
const addMessageToDatabase_1 = require("../../utils/addMessageToDatabase");
const Board = mongoose_1.default.model("boards");
exports.socketMessages = (socket, io, boardId) => {
    exports.sendInitialStateOfBoard(socket, boardId);
    exports.socketUpvote(socket, io, boardId);
    exports.socketToggleVoteVis(socket, io, boardId);
    exports.socketMessage(socket, io, boardId);
};
exports.sendInitialStateOfBoard = (socket, boardId) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.socketUpvote = (socket, io, boardId) => {
    socket.on("upvote", ({ message, value }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield upvoteMessageInDatabase_1.upvoteMessageInDatabase(message, value, boardId);
            const existingBoard = yield Board.findOne({ boardId: boardId });
            io.to(boardId).emit("message", existingBoard.messages);
        }
        catch (err) {
            handleSocketError_1.handleSocketError(err, socket);
        }
    }));
};
exports.socketToggleVoteVis = (socket, io, boardId) => {
    socket.on("toggle-votes", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currVal = yield toggleVotes_1.toggleVotes(boardId);
            if (currVal instanceof Error)
                return handleSocketError_1.handleSocketError(currVal, socket);
            io.to(boardId).emit("toggle-votes", !currVal);
        }
        catch (err) {
            handleSocketError_1.handleSocketError(err, socket);
        }
    }));
};
exports.socketMessage = (socket, io, boardId) => {
    socket.on("message", (newMessage) => __awaiter(void 0, void 0, void 0, function* () {
        const generatedNewMessage = yield addIdToMessage_1.addIdToMessage(newMessage, boardId);
        if (generatedNewMessage instanceof Error)
            return handleSocketError_1.handleSocketError(generatedNewMessage, socket);
        try {
            const newMessageList = yield addMessageToDatabase_1.addMessageToDatabase(boardId, generatedNewMessage);
            if (newMessageList instanceof Error)
                return handleSocketError_1.handleSocketError(newMessageList, socket);
            io.to(boardId).emit("message", newMessageList);
        }
        catch (err) {
            handleSocketError_1.handleSocketError(err, socket);
        }
    }));
};
//# sourceMappingURL=socketMessages.js.map