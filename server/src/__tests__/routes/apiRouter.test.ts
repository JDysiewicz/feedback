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

// API testing
import app from "../../index";
import request from "supertest";

test("GET /valid-room, true", async () => {
    const response = await request(app).get("/api/valid-room").query({boardId: "369332"});
    expect(response.status).toBe(200);
    expect(response.body).toBe(true);
});

test("GET /valid-room, invalid boardId", async () => {
    const response = await request(app).get("/api/valid-room").query({boardId: "invalid"});
    expect(response.status).toBe(400);
    expect(response.body.err).toBeTruthy();
    expect(response.body.err).toBe("BoardId does not exist");
});
test("GET /valid-room, missingBoardId", async () => {
    const response = await request(app).get("/api/valid-room").query({test: "nothing"});
    expect(response.status).toBe(400);
    expect(response.body.err).toBeTruthy();
    expect(response.body.err).toBe("Missing param: boardId");
});

test("GET /current-rooms, true", async () => {
    const response = await request(app).get("/api/current-rooms");
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();

    // Note - fragile test - relies on always having a test
    // board in DB / at least one.
    expect(response.body.length > 0).toBeTruthy();
});