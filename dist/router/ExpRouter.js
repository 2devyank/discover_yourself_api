"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ExpController_js_1 = require("../controller/ExpController.js");
const ValidateToken_js_1 = require("../middleware/ValidateToken.js");
const exprouter = express_1.default.Router();
exprouter.route("/exp").post(ValidateToken_js_1.validateUser, ExpController_js_1.postexp);
exprouter.route("/exp").get(ValidateToken_js_1.validateUser, ExpController_js_1.getexp);
exprouter.route("/exp/:id").put(ExpController_js_1.updateexp).delete(ExpController_js_1.deleteexp);
exports.default = exprouter;
