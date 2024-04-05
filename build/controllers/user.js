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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.changeUser = exports.login = exports.register = void 0;
const authentication_1 = __importDefault(require("../exceptions/authentication"));
const user_1 = require("../services/user");
const authentication_2 = require("../services/authentication");
const handleError_1 = require("exceptions/handleError");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const userEmail = yield (0, user_1.findUserByEmail)({ email });
    if (userEmail) {
        (0, handleError_1.handleError)(res, 400, "ERR_USER", "User with email already created", "");
    }
    else {
        try {
            const token = yield (0, user_1.createUser)({ email, username, password });
            res.status(201).json({ token });
        }
        catch (error) {
            (0, handleError_1.handleError)(res, 400, "ERR_USER", "User cannot be created", error);
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield (0, authentication_2.authenticate)({ email, password });
        res.status(201).json({
            token,
        });
    }
    catch (error) {
        if (error instanceof authentication_1.default) {
            (0, handleError_1.handleError)(res, 403, "ERR_AUTH", "Email or password is invalid", error);
        }
    }
});
exports.login = login;
const changeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { username, password } = req.body;
    try {
        yield (0, user_1.updateUser)(_id, { username, password });
        res.status(204).end();
    }
    catch (error) {
        (0, handleError_1.handleError)(res, 500, "ERR_USER", "User could not be updated", error);
    }
});
exports.changeUser = changeUser;
const removeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    try {
        yield (0, user_1.deleteUser)(_id);
        res.status(204).end();
    }
    catch (error) {
        (0, handleError_1.handleError)(res, 500, "ERR_USER", "User could not be deleted", error);
    }
});
exports.removeUser = removeUser;
