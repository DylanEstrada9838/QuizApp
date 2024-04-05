"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, statusCode, code, message, error) => {
    res.status(statusCode).json({
        code,
        message,
        error,
    });
};
exports.handleError = handleError;
