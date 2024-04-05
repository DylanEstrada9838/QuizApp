"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownError = void 0;
const unknownError = (err, request, response, next) => {
    response.status(500).json({
        message: "Unexpected Error",
        code: "ERR_UNKNOWN",
        details: err,
    });
};
exports.unknownError = unknownError;
