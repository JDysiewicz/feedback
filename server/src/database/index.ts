import mongoose from "mongoose";

const mongoURI = process.env.mongouri as string;

mongoose.connect(mongoURI, {useNewUrlParser: true});

const db = mongoose.connection;

export default db;