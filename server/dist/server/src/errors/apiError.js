"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(code, error, message) {
        this.code = code;
        this.error = error;
        this.message = message;
    }
    static badRequest({ error, message }) {
        return new ApiError(400, error, message);
    }
    static internalError({ error, message }) {
        return new ApiError(500, error, message);
    }
}
exports.default = ApiError;
//# sourceMappingURL=apiError.js.map