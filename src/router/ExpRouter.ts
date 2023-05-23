// import express from 'express'
const express=require('express')

// import { deleteexp, getexp, postexp, updateexp } from '../controller/ExpController.js';
// import { validateUser } from '../middleware/ValidateToken.js';
const {postexp}=require('../controller/ExpController')
const {getexp}=require('../controller/ExpController')
const {deleteexp}=require('../controller/ExpController')
const {updateexp}=require('../controller/ExpController')

const validateUser=require('../middleware/ValidateToken')

const exprouter=express.Router();


exprouter.route("/exp").post(validateUser,postexp);
exprouter.route("/exp").get(validateUser,getexp);

exprouter.route("/exp/:id").put(updateexp).delete(deleteexp);
module.exports= exprouter;
