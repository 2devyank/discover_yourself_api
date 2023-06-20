// import express from 'express';
const express=require('express')

// import { deleteproject, getproject, postproject, updateproject } from '../controller/ProjectController.js';
// import { validateUser } from '../middleware/ValidateToken.js';
const {postproject}=require('../controller/ProjectController')
const {getproject}=require('../controller/ProjectController')
const {updateproject}=require('../controller/ProjectController')
const {deleteproject}=require('../controller/ProjectController')
const {getprojectbyproid}=require('../controller/ProjectController')
const {getprojectbyprofileid}=require('../controller/ProjectController')
const validateUser=require('../middleware/ValidateToken')
const projectrouter=express.Router();



projectrouter.route("/project").post(validateUser,postproject);
projectrouter.route("/project").get(validateUser,getproject)
projectrouter.route("/project/:id").put(validateUser,updateproject);
projectrouter.route("/project/:id").delete(validateUser,deleteproject);
projectrouter.route("/project/:id").get(getprojectbyproid)
projectrouter.route("/project/:id").get(getprojectbyprofileid)
module.exports=projectrouter;