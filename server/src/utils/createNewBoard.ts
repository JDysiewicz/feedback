import mongoose from "mongoose";
import { BoardMessageList, Message } from "../../../types";

const Board = mongoose.model("boards");

export const createNewBoard = async (socketid: string, boardId: string): Promise<BoardMessageList> => {
    const newBoardMessageList: BoardMessageList = {creator: socketid, boardId: boardId, messages: [] as Message[], hideVotes: true};
    await new Board(newBoardMessageList).save();
    return newBoardMessageList;
};