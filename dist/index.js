"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dot = dotenv_1.default.config();
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const UserRouter_js_1 = __importDefault(require("./router/UserRouter.js"));
const ProjectRouter_js_1 = __importDefault(require("./router/ProjectRouter.js"));
const ExpRouter_js_1 = __importDefault(require("./router/ExpRouter.js"));
const PORT = process.env.PORT;
app.use("/", UserRouter_js_1.default);
app.use("/", ProjectRouter_js_1.default);
app.use("/", ExpRouter_js_1.default);
app.post("/", (req, res) => {
    res.send("meassage posted");
});
app.delete("/", (req, res) => {
    res.send("meassage deleted");
});
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
