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
exports.removeOption = exports.changeOption = exports.saveOption = exports.removeQuestion = exports.changeQuestion = exports.saveQuestion = exports.getAllQuizByUser = exports.removeQuiz = exports.changeQuiz = exports.saveQuiz = void 0;
const quiz_1 = require("../services/quiz");
const handleError_1 = require("exceptions/handleError");
const saveQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, questions, category, isOpen, isPublic } = req.body;
    const { _id } = req.user;
    const quizByName = yield (0, quiz_1.findQuizByName)(_id, name);
    console.log(quizByName);
    if (quizByName.length > 0) {
        (0, handleError_1.handleError)(res, 400, "ERR_DUPLICATE", "Quiz name is duplicated");
    }
    else {
        try {
            const quiz = yield (0, quiz_1.createQuiz)({
                name,
                questions,
                isPublic,
                isOpen,
                user: _id,
                category,
            });
            res.status(201).json(quiz);
        }
        catch (error) {
            if (error.name === "ValidationError") {
                const errors = Object.keys(error.errors).map((field) => ({
                    field,
                    message: error.errors[field].message,
                }));
                (0, handleError_1.handleError)(res, 400, "ERR_VALIDATION", "Validation failed", errors);
            }
            else {
                (0, handleError_1.handleError)(res, 500, "ERR_BADREQUEST", "Internal server error", error);
            }
        }
    }
});
exports.saveQuiz = saveQuiz;
const changeQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        yield (0, quiz_1.updateQuiz)(id, data);
        res.status(201).end();
    }
    catch (error) {
        (0, handleError_1.handleError)(res, 500, "ERR_BADREQUEST", "Update could not be done", error);
    }
});
exports.changeQuiz = changeQuiz;
const removeQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, quiz_1.deleteQuiz)(id);
        res.status(201).end();
    }
    catch (error) {
        (0, handleError_1.handleError)(res, 500, "ERR_BADREQUEST", "Operation failed", error);
    }
});
exports.removeQuiz = removeQuiz;
const getAllQuizByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    try {
        const quizzes = yield (0, quiz_1.findAllQuizByUser)(_id);
        res.status(200).json(quizzes);
    }
    catch (error) {
        (0, handleError_1.handleError)(res, 500, "ERR_BADREQUEST", "Operation failed", error);
    }
});
exports.getAllQuizByUser = getAllQuizByUser;
const saveQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        yield (0, quiz_1.pushQuestion)(id, data);
        res.status(200).end();
    }
    catch (error) {
        (0, handleError_1.handleError)(res, 500, "ERR_BADREQUEST", "Question could not be created", error);
    }
});
exports.saveQuestion = saveQuestion;
const changeQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quizId, questionId } = req.params;
    const data = req.body;
    try {
        yield (0, quiz_1.updateQuestion)(quizId, questionId, data);
        res.status(204).end();
    }
    catch (error) {
        (0, handleError_1.handleError)(res, 500, "ERR_BAD_REQUEST", "Question could not be updated", error);
    }
});
exports.changeQuestion = changeQuestion;
const removeQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quizId, questionId } = req.params;
    try {
        yield (0, quiz_1.deleteQuestion)(quizId, questionId);
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({
            message: "Question could not be deleted",
            error: error,
        });
    }
});
exports.removeQuestion = removeQuestion;
const saveOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = req.body;
    const { quizId, questionId } = req.params;
    try {
        yield (0, quiz_1.pushOption)(quizId, questionId, options);
        res.status(201).end();
    }
    catch (e) {
        res.status(500).json({
            message: "Option could not be added to question",
            error: e,
        });
    }
});
exports.saveOption = saveOption;
const changeOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quizId, questionId, optionId } = req.params;
    const data = req.body;
    try {
        yield (0, quiz_1.updateOption)(quizId, questionId, optionId, data);
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({
            message: "Option could not be updated",
            error: error,
        });
    }
});
exports.changeOption = changeOption;
const removeOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quizId, questionId, optionId } = req.params;
    try {
        yield (0, quiz_1.deleteOption)(quizId, questionId, optionId);
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({
            message: "Option could not be deleted",
            error: error,
        });
    }
});
exports.removeOption = removeOption;
