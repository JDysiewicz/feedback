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
exports.upvoteMessageInDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.upvoteMessageInDatabase = (message, value, boardId) => __awaiter(void 0, void 0, void 0, function* () {
    const Board = mongoose_1.default.model("boards");
    try {
        let dbResponse;
        if (value > 0)
            dbResponse = yield Board.updateOne({ boardId: boardId, "messages.id": message.id }, { $inc: { "messages.$.upvotes": 1 } });
        if (value < 0)
            dbResponse = yield Board.updateOne({ boardId: boardId, "messages.id": message.id }, { $inc: { "messages.$.upvotes": -1 } });
        if (dbResponse.n === 0)
            return new Error("No message by that id or no board by that id");
        if (dbResponse.n > 1)
            return new Error("Multiple messages by that id");
        return 1;
    }
    catch (err) {
        if (err instanceof Error)
            return err;
        return new Error("Something went wrong.");
    }
});
//# sourceMappingURL=upvoteMessageInDatabase.js.map