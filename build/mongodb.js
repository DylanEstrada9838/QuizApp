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
exports.connectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./mongomodels/user");
const quiz_1 = require("./mongomodels/quiz");
function deleteAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Delete all documents from the collection
            const result = yield user_1.User.deleteMany({});
            console.log(`${result.deletedCount} documents deleted from the collection.`);
        }
        catch (error) {
            console.error('Error deleting documents:', error);
        }
        finally {
            // Close the connection
            mongoose_1.default.disconnect();
        }
    });
}
function deleteAllQuizzes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Delete all documents from the collection
            const result = yield quiz_1.Quiz.deleteMany({});
            console.log(`${result.deletedCount} documents deleted from the collection.`);
        }
        catch (error) {
            console.error('Error deleting documents:', error);
        }
        finally {
            // Close the connection
            mongoose_1.default.disconnect();
        }
    });
}
const connectMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default
        .connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.7vrw2nf.mongodb.net/QuizApp?retryWrites=true&w=majority&appName=Cluster0`)
        .then(() => console.log("> Connection to MongoDB has been established"))
        // .then(()=> deleteAllQuizzes())
        // .then(()=>deleteAllUsers())
        .catch((e) => console.error("> Error:", e));
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
});
exports.connectMongo = connectMongo;
