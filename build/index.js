"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongodb_1 = require("./mongodb");
(0, mongodb_1.connectMongo)();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const user_1 = require("./routers/user");
const quiz_1 = require("./routers/quiz");
app.use("/users", user_1.userRouter);
app.use("/quizzes", quiz_1.quizRouter);
const unknown_error_1 = require("./middlewares/unknown-error");
app.use(unknown_error_1.unknownError);
app.listen(process.env.SERVER_PORT, () => {
    console.log(`> Server listening in port ${process.env.SERVER_PORT}`);
});
