import mongoose from "mongoose";

const { Schema } = mongoose;

const boardSchema = new Schema({
    creator: String,
    boardId: String,
    messages: [
        {user: String, message: String, upvotes: Number, id: String}
    ],
    hideVotes: Boolean
});

mongoose.model("boards", boardSchema);

