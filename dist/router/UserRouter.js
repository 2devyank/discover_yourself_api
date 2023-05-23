"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_js_1 = require("../controller/UserController.js");
const ValidateToken_js_1 = require("../middleware/ValidateToken.js");
const router = express_1.default.Router();
router.route("/register").post(UserController_js_1.registeruser);
router.route("/login").post(UserController_js_1.loginuser);
router.route("/updateuser/:id").put(ValidateToken_js_1.validateUser, UserController_js_1.updateuser);
router.get("/user", ValidateToken_js_1.validateUser, UserController_js_1.getuser);
exports.default = router;
