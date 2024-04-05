"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOption = exports.updateOption = exports.pushOption = exports.deleteQuestion = exports.updateQuestion = exports.pushQuestion = exports.deleteQuiz = exports.updateQuiz = exports.findQuizByName = exports.findQuizById = exports.findAllQuizByUser = exports.createQuiz = void 0;
const quiz_1 = require("../mongomodels/quiz");
/***********Quiz services***********/
const createQuiz = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield quiz_1.Quiz.create(data);
});
exports.createQuiz = createQuiz;
const findAllQuizByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield quiz_1.Quiz.find({ user: userId }, "name category isOpen isPublic createdAt");
});
exports.findAllQuizByUser = findAllQuizByUser;
const findQuizById = (quizId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield quiz_1.Quiz.findById(quizId);
});
exports.findQuizById = findQuizById;
const findQuizByName = (userId, name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield quiz_1.Quiz.find({ user: userId }, { name: name });
});
exports.findQuizByName = findQuizByName;
const updateQuiz = (quizId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield quiz_1.Quiz.findByIdAndUpdate(quizId, data);
});
exports.updateQuiz = updateQuiz;
const deleteQuiz = (quizId) => __awaiter(void 0, void 0, void 0, function* () {
    yield quiz_1.Quiz.findByIdAndDelete(quizId);
});
exports.deleteQuiz = deleteQuiz;
/***********Question services***********/
const pushQuestion = (quizId, questions) => __awaiter(void 0, void 0, void 0, function* () {
    const quiz = yield quiz_1.Quiz.findById(quizId);
    if (quiz) {
        questions.map((question) => {
            quiz.questions.push(question);
        });
        yield quiz.save();
    }
});
exports.pushQuestion = pushQuestion;
const updateQuestion = (quizId, questionId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const quiz = yield quiz_1.Quiz.findById(quizId);
    if (quiz) {
        quiz.questions.id(questionId).question = data.question;
    }
    yield quiz.save();
});
exports.updateQuestion = updateQuestion;
const deleteQuestion = (quizId, questionId) => __awaiter(void 0, void 0, void 0, function* () {
    const quiz = yield quiz_1.Quiz.findById(quizId);
    if (quiz) {
        quiz.questions.id(questionId).deleteOne();
        yield quiz.save();
    }
});
exports.deleteQuestion = deleteQuestion;
/***********Option services***********/
const pushOption = (quizId, questionId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const quiz = yield quiz_1.Quiz.findById({ _id: quizId });
    if (quiz) {
        options.map((option) => {
            quiz.questions.id(questionId).options.push(option);
        });
        yield quiz.save();
    }
});
exports.pushOption = pushOption;
const updateOption = (quizId, questionId, optionId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const quiz = yield quiz_1.Quiz.findById(quizId);
    if (quiz) {
        Object.keys(data).map((key) => {
            var _a;
            const option = (_a = quiz.questions.id(questionId)) === null || _a === void 0 ? void 0 : _a.options.id(optionId);
            if (option) {
                option[key] = data[key];
            }
        });
        yield quiz.save();
    }
});
exports.updateOption = updateOption;
const deleteOption = (quizId, questionId, optionId) => __awaiter(void 0, void 0, void 0, function* () {
    const quiz = yield quiz_1.Quiz.findById(quizId);
    if (quiz) {
        quiz.questions.id(questionId).options.id(optionId).deleteOne();
        yield quiz.save();
    }
});
exports.deleteOption = deleteOption;
