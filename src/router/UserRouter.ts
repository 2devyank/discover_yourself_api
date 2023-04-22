import express from "express"
import { loginuser, registeruser } from "../controller/UserController.js";

const router=express.Router();

router.route("/register").post(registeruser)
router.route("/login").post(loginuser)

export default router;