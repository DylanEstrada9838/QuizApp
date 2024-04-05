import dotenv from "dotenv";
import {connectMongo} from "./mongodb"
import express from "express";
import {userRouter} from "./routers/user";
import {quizRouter} from "./routers/quiz"
import {validationError} from "./middlewares/validation-error"
import {unknownError} from "./middlewares/unknown-error";

dotenv.config();
connectMongo();

const app = express();
app.use(express.json())

app.use("/users",userRouter)
app.use("/quizzes",quizRouter)

app.use(validationError)
app.use(unknownError)


app.listen(process.env.SERVER_PORT,()=>{
    console.log(`> Server listening in port ${process.env.SERVER_PORT}`);
})