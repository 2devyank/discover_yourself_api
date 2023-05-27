// import express from "express"
const express=require('express')
const {registeruser}=require('../controller/UserController')
const {loginuser}=require('../controller/UserController')
const {updateuser}=require('../controller/UserController')
const {getuser}=require('../controller/UserController')
const {getalluser}=require('../controller/UserController')
// import { getuser, loginuser, registeruser, updateuser } from "../controller/UserController.js";
// import { validateUser } from "../middleware/ValidateToken.js";
const validateUser=require('../middleware/ValidateToken')
const router=express.Router();

router.route("/register").post(registeruser)
router.route("/login").post(loginuser)
router.route("/updateuser/:id").put(validateUser,updateuser);
router.get("/user",validateUser,getuser)
router.get('/alluser',getalluser);

module.exports=router