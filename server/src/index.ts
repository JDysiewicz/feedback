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

// Connect to DB
mongoose.connect(process.env.mongouri as string, {useNewUrlParser: true});
require("./database/models/boards.ts");

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

// Routing
app.use("/api", apiRouter);
app.use(errorHandler);

// out 4 times for build as when built with tsc will be ready
app.use(express.static(path.join(__dirname, "../../../../build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../../build", "index.html"));
});

export default app;