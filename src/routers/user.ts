import express from "express";
import { register, login, changeUser, removeUser } from "../controllers/user";
import jwtValidation from "../middlewares/passport";

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.put("/", jwtValidation, changeUser);
router.delete("/", jwtValidation, removeUser);

export {router as userRouter};
