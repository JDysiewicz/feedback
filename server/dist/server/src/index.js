"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: `${__dirname}/.env` });
}
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
try {
    mongoose_1.default.connect(process.env.mongouri, { useNewUrlParser: true });
}
catch (err) {
    console.log("--UNABLE TO CONNECT TO DB--");
}
require("./database/models/boards");
const apiRouter_1 = __importDefault(require("./bin/routes/apiRouter"));
const errorHandler_1 = __importDefault(require("./errors/errorHandler"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});
app.use(cors_1.default());
app.options("*", cors_1.default());
app.use("/api", apiRouter_1.default);
app.use(errorHandler_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../../../build")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../../../build", "index.html"));
});
exports.default = app;
//# sourceMappingURL=index.js.map