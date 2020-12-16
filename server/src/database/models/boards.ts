import mongoose from "mongoose";

const { Schema } = mongoose;

const messagesSchema = new Schema({
    user: String,
    message: String,
    upvotes: Number,
    id: String
});

const boardSchema = new Schema({
    creator: String,
    boardId: String,
    messages: [messagesSchema],
    hideVotes: Boolean
},);

mongoose.model("boards", boardSchema);

