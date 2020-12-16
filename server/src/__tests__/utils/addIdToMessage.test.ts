// Init database setup
import mongoose from "mongoose";
import path from "path";
require("dotenv").config({path: path.resolve(__dirname, "../../.env")});
require("../../database/models/boards");
beforeAll(() => {
    mongoose.connect(process.env.mongouri as string);
});

afterAll(() => {
    mongoose.connection.close();
});

import { addIdToMessage } from "../../utils/addIdToMessage";

test("utils: addIdToMessage, correct usage", async () => {
    const testBoardId = "369332";
    const generatedNewMessage = await addIdToMessage(
        { user: "abc123", message: "This is the test db.", upvotes: 2},
        testBoardId ) as any;
    expect(generatedNewMessage.stack).not.toBeTruthy();
    expect(generatedNewMessage.message).toBe("This is the test db.");
    expect(generatedNewMessage.user).toBe("abc123");
    expect(typeof generatedNewMessage.id).toBe("string");
    expect(generatedNewMessage.upvotes).toBe(2);
    expect(generatedNewMessage.id.length > 0).toBeTruthy();
});

test("utils: addIdToMessage, invalid board", async () => {
    const testBoardId = "000000";
    const generatedNewMessage = await addIdToMessage(
        { user: "abc123", message: "This is the test db.", upvotes: 2},
        testBoardId ) as any;
    expect(generatedNewMessage.stack).toBeTruthy();
    expect(generatedNewMessage.message).toBeTruthy();
});