import { Message, MongoFeedbackBoard } from "../../../types";
import mongoose from "mongoose";

export const addMessageToDatabase = async (boardId: string, newMessage: Message): Promise<Message[] | Error> => {
    const Board = mongoose.model("boards");
    try {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        const newMessageList = [...existingBoard.messages, newMessage];
        await Board.updateOne({boardId: boardId}, {$set: {messages: newMessageList}});
        return newMessageList;
    } catch (err) {
        return new Error(err);
    }
};