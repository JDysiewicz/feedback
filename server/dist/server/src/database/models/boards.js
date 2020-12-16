"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const messagesSchema = new Schema({
    user: String,
    message: String,
    upvotes: Number,
    id: String
});
const boardSchema = new Schema({
    creator: String,
    boardId: String,
    messages: [messagesSchema],
    hideVotes: Boolean
});
mongoose_1.default.model("boards", boardSchema);
//# sourceMappingURL=boards.js.map