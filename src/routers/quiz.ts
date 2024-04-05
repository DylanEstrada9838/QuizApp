import express from "express";
import {
  saveQuiz,
  getAllQuizByUser,
  saveQuestion,
  saveOption,
  changeQuiz,
  changeQuestion,
  changeOption,
  removeOption,
  removeQuestion,
  removeQuiz
} from "../controllers/quiz";
import { quizIdParams } from "../validations/quiz";
import joiValidator from "../middlewares/joi"
import jwtValidation from "../middlewares/passport";

const router = express.Router();

router.post("/",jwtValidation, saveQuiz);
router.get("/",jwtValidation,getAllQuizByUser)
router.post("/:id/questions",jwtValidation,saveQuestion)
router.post("/:quizId/questions/:questionId",jwtValidation,saveOption)
router.put("/:quizId",jwtValidation,joiValidator.params(quizIdParams),changeQuiz)
router.put("/:quizId/questions/:questionId",jwtValidation,changeQuestion)
router.put("/:quizId/questions/:questionId/options/:optionId",jwtValidation,changeOption)
router.delete("/:id",jwtValidation,removeQuiz)
router.delete("/:quizId/questions/:questionId",jwtValidation,removeQuestion)
router.delete("/:quizId/questions/:questionId/options/:optionId",jwtValidation,removeOption)

export {router as quizRouter};