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
exports.addIdToMessage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Board = mongoose_1.default.model("boards");
exports.addIdToMessage = (newMessage, boardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingBoard = yield Board.findOne({ boardId: boardId });
        const currentIds = existingBoard.messages.map(message => message.id);
        let id = generateRandomId();
        while (currentIds.indexOf(id) !== -1)
            id = generateRandomId();
        const generatedNewMessage = Object.assign(Object.assign({}, newMessage), { id });
        return generatedNewMessage;
    }
    catch (err) {
        return new Error(err);
    }
});
const generateRandomId = () => {
    let id = "";
    const CHARSET = "abcdefghijklmnopqrstuvwxyz0123456789";
    const ID_LENGTH = 8;
    for (let i = 0; i < ID_LENGTH; i++) {
        id += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
    }
    return id;
};
//# sourceMappingURL=addIdToMessage.js.map