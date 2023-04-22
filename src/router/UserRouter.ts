import express from "express"
import { getuser, loginuser, registeruser } from "../controller/UserController.js";
import { validateUser } from "../middleware/ValidateToken.js";

const router=express.Router();

router.route("/register").post(registeruser)
router.route("/login").post(loginuser)
router.get("/user",validateUser,getuser)
export default router;