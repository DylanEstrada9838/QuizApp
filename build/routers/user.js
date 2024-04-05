"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const passport_1 = __importDefault(require("../middlewares/passport"));
const router = express_1.default.Router();
exports.userRouter = router;
router.post("/signup", user_1.register);
router.post("/signin", user_1.login);
router.put("/", passport_1.default, user_1.changeUser);
router.delete("/", passport_1.default, user_1.removeUser);
