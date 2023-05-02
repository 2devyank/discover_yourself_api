import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const dot = dotenv.config();
const app = express();
import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
import router from "./router/UserRouter.js";
import projectrouter from "./router/ProjectRouter.js";
const PORT = process.env.PORT;
app.use("/", router);
app.use("/", projectrouter);
app.post("/", (req, res) => {
    res.send("meassage posted");
});
app.delete("/", (req, res) => {
    res.send("meassage deleted");
});
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
