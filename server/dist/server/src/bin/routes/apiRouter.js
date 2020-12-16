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
const express_1 = require("express");
const apiError_1 = __importDefault(require("../../errors/apiError"));
const mongoose_1 = __importDefault(require("mongoose"));
const Board = mongoose_1.default.model("boards");
const router = express_1.Router();
router.get("/valid-room", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const boardId = req.query.boardId;
    if (boardId === undefined)
        return next(apiError_1.default.badRequest({ error: "Missing param: boardId", message: "Missing boardId param" }));
    try {
        const existingBoard = yield Board.findOne({ boardId: boardId });
        if (!existingBoard)
            return next(apiError_1.default.badRequest({ error: "BoardId does not exist", message: "No currently active board by that ID" }));
        return res.status(200).send(true);
    }
    catch (err) {
        if (err instanceof Error)
            return next(apiError_1.default.internalError({ error: err, message: "Something went wrong" }));
        if (typeof err === "string")
            return next(new Error(err));
        console.log(err);
        return next("Something went wrong.");
    }
}));
router.get("/current-rooms", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingBoards = yield Board.find();
        const roomsArr = existingBoards.map(board => board.boardId);
        return res.send(roomsArr);
    }
    catch (err) {
        if (err instanceof Error)
            return next(apiError_1.default.internalError({ error: err, message: "Something went wrong" }));
        if (typeof err === "string")
            return next(new Error(err));
        console.log(err);
        return next("Something went wrong.");
    }
}));
exports.default = router;
//# sourceMappingURL=apiRouter.js.map