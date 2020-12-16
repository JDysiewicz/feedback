import { Request, Response, Router } from "express";
import ApiError from "../../errors/apiError";
import mongoose from "mongoose";
import { Message } from "../../../../types";

const Board = mongoose.model("boards");

const router = Router();

interface MongoFeedbackBoard {
    _id: string;
    creator: string;
    boardId: string;
    messages: Message[];
    hideVotes: boolean;
    __v: number;
}

router.get("/valid-room", async (req: Request, res: Response, next) => {
    const boardId: string = req.query.boardId as string;
    if (boardId === undefined) return next(ApiError.badRequest({error: "Missing param: boardId", message: "Missing boardId param"}));
    const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
    if (!existingBoard) return next(ApiError.badRequest({error: "BoardId does not exist", message: "No currently active board by that ID"}));
    res.status(200).send(true);
});

router.get("/current-rooms", async (req: Request, res: Response, next) => {
    try {
        const existingBoards: MongoFeedbackBoard[] = (await Board.find() as unknown) as MongoFeedbackBoard[];
        const roomsArr = existingBoards.map(board => board.boardId);
        return res.send(roomsArr);
    } catch (err: unknown) {
        if (err instanceof Error){
            return next(ApiError.internalError({error: err, message: "Something went wrong"}));
        }
    }
});

export default router;