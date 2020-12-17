"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("./apiError"));
const errorHandler = (err, req, res, next) => {
    console.log("ERROR: ", err);
    if (err instanceof apiError_1.default) {
        res.status(err.code).send({ success: false, err: err.error, message: err.message });
    }
    else {
        res.status(500).send({ success: false, err: "Internal server error", message: "Something went wrong" });
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map