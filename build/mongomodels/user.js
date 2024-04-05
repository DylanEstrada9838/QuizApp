"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
exports.User = (0, mongoose_1.model)("User", new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 100,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email address format",
        },
    },
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 100,
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        select: false,
    },
}, { timestamps: true }));
