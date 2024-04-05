import {
  createQuiz,
  updateQuiz,
  findAllQuizByUser,
  deleteQuiz,
  pushQuestion,
  findQuizByName,
  pushOption,
  updateQuestion,
  updateOption,
  deleteOption,
  deleteQuestion,
  findQuizById,
} from "../services/quiz";
import { Response, Request, RequestHandler } from "express";
import { handleError } from "../exceptions/handleError";


export const saveQuiz = async (req: Request, res: Response) => {
  const { name, questions, category, isOpen, isPublic } = req.body;
  const { _id } = req.user;

  const quizByName = await findQuizByName(_id, name);

  if (quizByName.length > 0) {
    handleError(res, 400, "ERR_DUPLICATE", "Quiz name is duplicated");
  } else {
    try {
      const quiz = await createQuiz({
        name,
        questions,
        isPublic,
        isOpen,
        user: _id,
        category,
      });
      res.status(201).json(quiz);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const errors = Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        }));
        handleError(res, 400, "ERR_VALIDATION", "Validation failed", errors);
      } else {
        handleError(
          res,
          500,
          "ERR_BADREQUEST",
          "Quiz could not be created",
          error
        );
      }
    }
  }
};

export const changeQuiz = async (req: Request, res: Response) => {
  const { quizId } = req.params;
  const data = req.body;
  const quiz = await findQuizById(quizId);
  if (!quiz) {
    handleError(res, 400, "ERR_NOT_FOUND", "Quiz not found");
  } else {
    try {
      await updateQuiz(quizId, data);
      res.status(204).end();
    } catch (error) {
      handleError(
        res,
        500,
        "ERR_BADREQUEST",
        "Update could not be done",
        error
      );
    }
  }
};

export const removeQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  const quiz = await findQuizById(id);
  if (!quiz) {
    handleError(res, 400, "ERR_NOT_FOUND", "Quiz not found");
  } else {
    try {
      await deleteQuiz(id);
      res.status(201).end();
    } catch (error) {
      handleError(res, 500, "ERR_BADREQUEST", "Operation failed", error);
    }
  }
};

export const getAllQuizByUser = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    const quizzes = await findAllQuizByUser(_id);
    res.status(200).json(quizzes);
  } catch (error) {
    handleError(res, 500, "ERR_BADREQUEST", "Operation failed", error);
  }
};

export const saveQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const quiz = await findQuizById(id);
  if (!quiz) {
    handleError(res, 400, "ERR_NOT_FOUND", "Quiz not found");
  } else {
    try {
      await pushQuestion(id, data);
      res.status(200).end();
    } catch (error) {
      handleError(
        res,
        500,
        "ERR_BADREQUEST",
        "Question could not be created",
        error
      );
    }
  }
};

export const changeQuestion = async (req: Request, res: Response) => {
  const { quizId, questionId } = req.params;
  const data = req.body;
  const quiz = await findQuizById(quizId);
  if (!quiz) {
    handleError(res, 400, "ERR_NOT_FOUND", "Quiz not found");
  } else {
  try {
    await updateQuestion(quizId, questionId, data);
    res.status(204).end();
  } catch (error) {
    handleError(
      res,
      500,
      "ERR_BAD_REQUEST",
      "Question could not be updated",
      error
    );
  }
}
};

export const removeQuestion = async (req: Request, res: Response) => {
  const { quizId, questionId } = req.params;
  const quiz = await findQuizById(quizId);
  if (!quiz) {
    handleError(res, 400, "ERR_NOT_FOUND", "Quiz not found");
  } else {
  try {
    await deleteQuestion(quizId, questionId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: "Question could not be deleted",
      error: error,
    });
  }
}
};

export const saveOption = async (req: Request, res: Response) => {
  const options = req.body;
  const { quizId, questionId } = req.params;
  const quiz = await findQuizById(quizId);
  if (!quiz) {
    handleError(res, 400, "ERR_NOT_FOUND", "Quiz not found");
  } else {
  try {
    await pushOption(quizId, questionId, options);
    res.status(201).end();
  } catch (e) {
    res.status(500).json({
      message: "Option could not be added to question",
      error: e,
    });
  }
}
};

export const changeOption = async (req: Request, res: Response) => {
  const { quizId, questionId, optionId } = req.params;

  const data = req.body;
  const quiz = await findQuizById(quizId);
  if (!quiz) {
    handleError(res, 400, "ERR_NOT_FOUND", "Quiz not found");
  } else {
  try {
    await updateOption(quizId, questionId, optionId, data);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: "Option could not be updated",
      error: error,
    });
  }
}
};

export const removeOption = async (req: Request, res: Response) => {
  const { quizId, questionId, optionId } = req.params;
  const quiz = await findQuizById(quizId);
  if (!quiz) {
    handleError(res, 400, "ERR_NOT_FOUND", "Quiz not found");
  } else {
  try {
    await deleteOption(quizId, questionId, optionId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: "Option could not be deleted",
      error: error,
    });
  }
}
};
