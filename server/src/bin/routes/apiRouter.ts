import { Request, Response, Router } from "express";
import ApiError from "../../errors/apiError";
import { boardMessageLists } from "../../utils/boardMessageLists";

const router = Router();

router.get("/valid-room", (req: Request, res: Response, next) => {
    const boardId: string = req.query.boardId as string;
    if (boardId === undefined) return next(ApiError.badRequest({error: "Missing param: boardId", message: "Missing boardId param"}));
    console.log(boardMessageLists);
    console.log(boardId);
    const existingBoard = boardMessageLists[boardId];
    if (!existingBoard) return next(ApiError.badRequest({error: "BoardId does not exist", message: "No currently active board by that ID"}));

    res.status(200).send(true);
});

router.get("/current-boards", (req: Request, res: Response, next) => {
    const boardId: string = req.query.boardId as string;
    const existingBoard = boardMessageLists[boardId];
    if (!existingBoard) return next(ApiError.badRequest({error: "Attempting to access undefined board via URL", message: "That room does not exist."}));

    res.status(200).send(true);
});

export default router;