"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIdToMessage = void 0;
const boardMessageLists_1 = require("./boardMessageLists");
const generateId = () => {
    let id = "";
    const CHARSET = "abcdefghijklmnopqrstuvwxyz0123456789";
    const ID_LENGTH = 8;
    for (let i = 0; i < ID_LENGTH; i++) {
        id += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
    }
    return id;
};
exports.addIdToMessage = (newMessage, boardId) => {
    try {
        const currentIds = boardMessageLists_1.boardMessageLists[boardId].messages.map(message => message.id);
        let id = generateId();
        while (currentIds.indexOf(id) !== -1)
            id = generateId();
        const generatedNewMessage = Object.assign(Object.assign({}, newMessage), { id });
        return generatedNewMessage;
    }
    catch (err) {
        return new Error(err);
    }
};
//# sourceMappingURL=addIdToMessage.js.map