import { Message } from "../../../types";
import mongoose from "mongoose";

export const upvoteMessageInDatabase = async (message: Message, value: number, boardId: string ): Promise<1 | Error> => {
    const Board = mongoose.model("boards");
    try {
        let dbResponse;
        if (value > 0) dbResponse = await Board.updateOne({boardId: boardId, "messages.id": message.id}, {$inc: {"messages.$.upvotes": 1}});
        if (value < 0) dbResponse = await Board.updateOne({boardId: boardId, "messages.id": message.id}, {$inc: {"messages.$.upvotes": -1}});
        if (dbResponse.n === 0) return new Error("No message by that id or no board by that id");
        if (dbResponse.n > 1) return new Error("Multiple messages by that id");
        return 1;
    } catch (err: unknown) {
        if (err instanceof Error) return err;
        return new Error("Something went wrong.");
    }
};