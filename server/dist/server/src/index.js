"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors = require("cors");
const app = express_1.default();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use(cors());
app.options('*', cors());
app.use(express_1.default.static(path_1.default.join(__dirname, '../../../../build')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../../../build", "index.html"));
});
exports.default = app;
//# sourceMappingURL=index.js.map