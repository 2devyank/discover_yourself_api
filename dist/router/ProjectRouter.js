"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectController_js_1 = require("../controller/ProjectController.js");
const ValidateToken_js_1 = require("../middleware/ValidateToken.js");
const projectrouter = express_1.default.Router();
projectrouter.route("/project").post(ValidateToken_js_1.validateUser, ProjectController_js_1.postproject);
projectrouter.route("/project").get(ValidateToken_js_1.validateUser, ProjectController_js_1.getproject);
projectrouter.route("/project/:id").put(ValidateToken_js_1.validateUser, ProjectController_js_1.updateproject);
projectrouter.route("/project/:id").delete(ValidateToken_js_1.validateUser, ProjectController_js_1.deleteproject);
exports.default = projectrouter;
