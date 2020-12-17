// Init database setup
import mongoose from "mongoose";
import path from "path";
import { Message, MongoFeedbackBoard } from "../../../../types";
require("dotenv").config({path: path.resolve(__dirname, "../../.env")});
require("../../database/models/boards");
beforeAll(() => {
    mongoose.connect(process.env.mongouri as string);
});

afterAll(() => {
    mongoose.connection.close();
});

import { upvoteMessageInDatabase } from "../../utils/upvoteMessageInDatabase";

// NOTE - Expects 
test("utils: upvoteMessageInDatabase, invalid board", async () => {
    const boardId = "invalid";
    const message: Message = {id: "ref", upvotes: 99, message: "Reference For Test", user: "abc123"};
    const value = 1;
    const shouldBeError = await upvoteMessageInDatabase(message, value, boardId);
    if (shouldBeError instanceof Error){
        expect(shouldBeError.name).toBe("Error");
    } else {
        throw Error();
    }
});

test("utils: upvoteMessageInDatabase, valid board, invalid message", async () => {
    const boardId = "invalid";
    const message: Message = {id: "invalid", upvotes: 99, message: "Reference For Test", user: "abc123"};
    const value = 1;
    const shouldBeError = await upvoteMessageInDatabase(message, value, boardId);
    if (shouldBeError instanceof Error){
        expect(shouldBeError.name).toBe("Error");
    } else {
        throw Error();
    }
});

test("utils: upvoteMessageInDatabase, valid +1", async () => {
    const boardId = "369332";
    const newMessageId = Math.random().toString();
    const message: Message = {id: newMessageId, upvotes: 99, message: "Reference For Test", user: "abc123"};
    const value = 1;
    const shouldBeError = await upvoteMessageInDatabase(message, value, boardId);
    if (shouldBeError instanceof Error){
        expect(shouldBeError.name).toBe("Error");
    } else {
        expect(shouldBeError).toBeTruthy();
        const Board = mongoose.model("boards");
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        const messageInDb = existingBoard.messages.filter(msg => msg.id === newMessageId);
        expect(messageInDb[0].upvotes).toBe(message.upvotes + 1);
    }
});

test("utils: upvoteMessageInDatabase, valid -1", async () => {
    const boardId = "369332";
    const newMessageId = Math.random().toString();
    const message: Message = {id: newMessageId, upvotes: 99, message: "Reference For Test", user: "abc123"};
    const value = -1;
    const shouldBeError = await upvoteMessageInDatabase(message, value, boardId);
    if (shouldBeError instanceof Error){
        expect(shouldBeError.name).toBe("Error");
    } else {
        expect(shouldBeError).toBeTruthy();
        const Board = mongoose.model("boards");
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        const messageInDb = existingBoard.messages.filter(msg => msg.id === newMessageId);
        expect(messageInDb[0].upvotes).toBe(message.upvotes - 1);
    }
});