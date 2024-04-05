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
exports.authenticate = void 0;
const user_1 = require("./user");
const security_1 = require("./security");
const authentication_1 = __importDefault(require("../exceptions/authentication"));
const authenticate = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = credentials;
    const user = yield (0, user_1.findUserByEmail)({ email });
    if (!user) {
        throw new authentication_1.default();
    }
    const isPasswordValid = yield (0, security_1.compare)(password, user.password);
    if (!isPasswordValid) {
        throw new authentication_1.default();
    }
    return (0, security_1.sign)({ _id: user._id });
});
exports.authenticate = authenticate;
