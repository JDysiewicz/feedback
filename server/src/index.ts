import express from "express";
import path from "path";
const cors = require("cors");
const app = express();

// CORS stuff
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(cors());
app.options('*', cors());

// out 4 times for build as when built with tsc will be ready
app.use(express.static(path.join(__dirname, '../../../../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../../../build", "index.html"))
});

export default app;