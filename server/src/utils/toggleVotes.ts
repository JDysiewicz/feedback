import { MongoFeedbackBoard } from "../../../types";
import mongoose from "mongoose";

export const toggleVotes = async (boardId: string): Promise<boolean | Error> => {
    const Board = mongoose.model("boards");
    try {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        const currVal = existingBoard.hideVotes;
        await Board.updateOne({boardId: boardId}, {$set: {hideVotes: !currVal}});
        return currVal;
    } catch (err) {
        return new Error(err);
    }
};