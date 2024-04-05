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
exports.deleteUser = exports.updateUser = exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const user_1 = require("../mongomodels/user");
const security_1 = require("./security");
const security_2 = require("./security");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data.password = yield (0, security_1.hash)(data.password);
    const user = yield user_1.User.create(data);
    return (0, security_2.sign)({ id: user.id });
});
exports.createUser = createUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.User.findOne(email); });
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.User.findById(id); });
exports.findUserById = findUserById;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.password) {
        data.password = yield (0, security_1.hash)(data.password);
    }
    yield user_1.User.findByIdAndUpdate(id, data);
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.User.deleteOne(id); });
exports.deleteUser = deleteUser;
