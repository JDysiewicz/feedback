// Use env vars in local
import * as dotenv from "dotenv";
if (process.env.NODE_ENV !== "production"){
    dotenv.config({path: `${__dirname}/.env`});
}

import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
const app = express();

// Connect to DB and initiate models
try {
    mongoose.connect(process.env.mongouri as string, {useNewUrlParser: true});
} catch (err) {
    console.log("--UNABLE TO CONNECT TO DB--");
}

require("./database/models/boards");

// Route Handlers
import apiRouter from "./bin/routes/apiRouter";
import errorHandler from "./errors/errorHandler";

// CORS stuff
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});
app.use(cors());
app.options("*", cors());

// Routes
app.use("/api", apiRouter);
app.use(errorHandler);

// Build folder is out 4 times when compiled
app.use(express.static(path.join(__dirname, "../../../../build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../../build", "index.html"));
});

export default app;