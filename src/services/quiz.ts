import { Quiz } from "../mongomodels/quiz";
import { ObjectId } from "bson";

/***********Quiz services***********/

export const createQuiz = async (data: Record<string, any>) => {
  return await Quiz.create(data);
};

export const findAllQuizByUser = async (userId: string) => {
  return await Quiz.find(
    { user: userId },
    "name category isOpen isPublic createdAt"
  );
};


export const findQuizById = async (quizId: string) => {

  return await Quiz.findById(quizId);
};

export const findQuizByName = async (userId: string, name: string) => {
  return await Quiz.find({ user: userId }, { name: name });
};

export const updateQuiz = async (quizId: string, data: Record<string, any>) => {
 
    await Quiz.findByIdAndUpdate(quizId, data);
  
};

export const deleteQuiz = async (quizId: string) => {
  await Quiz.findByIdAndDelete(quizId);
};

/***********Question services***********/

export const pushQuestion = async (quizId: string, questions: any[]) => {
  const quiz = await Quiz.findById(quizId);
  if (quiz) {
    questions.map((question) => {
      quiz.questions.push(question);
    });
    await quiz.save();
  }
};

export const updateQuestion = async (
  quizId: string,
  questionId: string,
  data: Record<string, any>
) => {
  const quiz = await Quiz.findById(quizId);
  if (quiz) {
    quiz.questions.id(questionId).question = data.question;
  }
  await quiz.save();
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const quiz = await Quiz.findById(quizId);
  if (quiz) {
    quiz.questions.id(questionId).deleteOne();
    await quiz.save();
  }
};

/***********Option services***********/

export const pushOption = async (
  quizId: string,
  questionId: string,
  options: any[]
) => {
 
  const quiz = await Quiz.findById({_id:quizId});
  
    options.map((option) => {
      quiz.questions.id(questionId).options.push(option);
    });
    await quiz.save();
};

export const updateOption = async (
  quizId: string,
  questionId: string,
  optionId: string,
  data: Record<string, any>
) => {
  const quiz = await Quiz.findById(quizId);
  if (quiz) {
    Object.keys(data).map((key) => {
      const option = quiz.questions.id(questionId)?.options.id(optionId);
      if (option) {
        (option as any)[key] = data[key];
      }
    });

    await quiz.save();
  }
};

export const deleteOption = async (
  quizId: string,
  questionId: string,
  optionId: string
) => {
  const quiz = await Quiz.findById(quizId);
  if (quiz) {
    quiz.questions.id(questionId).options.id(optionId).deleteOne();
    await quiz.save();
  }
};
