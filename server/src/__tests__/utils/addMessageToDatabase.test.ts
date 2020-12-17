// Init database setup
import mongoose from "mongoose";
import path from "path";
import { Message } from "../../../../types";
require("dotenv").config({path: path.resolve(__dirname, "../../.env")});
require("../../database/models/boards");
beforeAll(() => {
    mongoose.connect(process.env.mongouri as string);
});

afterAll(() => {
    mongoose.connection.close();
});

import { addMessageToDatabase } from "../../utils/addMessageToDatabase";

test("utils: addMessageToDatabase, invalid board", async () => {
    const boardId = "invalid";
    const newMessage: Message = {id: "10", upvotes: 1, message: "Test", user: "abc123"};
    const shouldBeError = await addMessageToDatabase(boardId, newMessage);

    if (shouldBeError instanceof Error){
        expect(shouldBeError.name).toBe("Error");
    } else {
        throw Error();
    }
});

test("utils: addMessageToDatabase, valid board", async () => {
    const boardId = "369332";
    const newMessage: Message = {id: "ref", upvotes: 99, message: "Reference For Test", user: "abc123"};
    const shouldBeMessageList = await addMessageToDatabase(boardId, newMessage);

    if (shouldBeMessageList instanceof Error){
        throw Error();
    } else {
        expect(shouldBeMessageList.length > 0).toBeTruthy();
        expect(typeof shouldBeMessageList[0].id).toBe("string");
        expect(typeof shouldBeMessageList[0].upvotes).toBe("number");
    }
});