"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserController_js_1 = require("../controller/UserController.js");
const validateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.status(401);
            throw new Error("Token not found");
        }
        const decoded = jsonwebtoken_1.default.verify(token, UserController_js_1.SECRET_Key);
        // console.log(decoded);
        // (req as CustomRequest).token=decoded;
        res.locals.JwtPayload = decoded;
        res.locals.user = res.locals.JwtPayload.data;
        console.log(res.locals.JwtPayload.user.id);
        next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.validateUser = validateUser;
