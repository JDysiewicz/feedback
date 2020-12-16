// Init database setup
import mongoose from "mongoose";
import path from "path";
require("dotenv").config({path: path.resolve(__dirname, "../../.env")});
require("../../database/models/boards");
beforeEach(() => {
    mongoose.connect(process.env.mongouri as string);
});

afterEach(() => {
    mongoose.connection.close();
});

import { createNewBoard } from "../../utils/createNewBoard"; 

const Board = mongoose.model("boards");

test("util: createNewBoard, correct", async () => {
    const creator = "abc123";
    const boardId = "00";
    const newBoard = await createNewBoard(creator, boardId);
    expect(newBoard.boardId).toBe(boardId);
    expect(newBoard.creator).toBe(creator);
    expect(newBoard.messages.length).toBe(0);
    expect(newBoard.hideVotes).toBe(true);

    // Delete the newly made board
    await Board.remove({boardId: boardId});
});