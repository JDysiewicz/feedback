"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiError_1 = __importDefault(require("../../errors/apiError"));
const boardMessageLists_1 = require("../../utils/boardMessageLists");
const router = express_1.Router();
router.get("/valid-room", (req, res, next) => {
    const boardId = req.query.boardId;
    if (boardId === undefined)
        return next(apiError_1.default.badRequest({ error: "Missing param: boardId", message: "Missing boardId param" }));
    const existingBoard = boardMessageLists_1.boardMessageLists[boardId];
    if (!existingBoard)
        return next(apiError_1.default.badRequest({ error: "BoardId does not exist", message: "No currently active board by that ID" }));
    res.status(200).send(true);
});
exports.default = router;
//# sourceMappingURL=apiRouter.js.map