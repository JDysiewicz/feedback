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

import { toggleVotes } from "../../utils/toggleVotes";

test("utils: toggleVotes, invalid", async () => {
    const boardId = "invalid";
    const shouldBeError = await toggleVotes(boardId);
    if (shouldBeError instanceof Error){
        expect(shouldBeError.name).toBe("Error");
    } else {
        throw Error();
    }
});

test("utils: toggleVotes, valid", async () => {
    const boardId = "369332";
    const shouldBeBool = await toggleVotes(boardId);
    if (shouldBeBool instanceof Error){
        throw Error();
    } else {
        expect(typeof shouldBeBool).toBe("boolean");
    }
});