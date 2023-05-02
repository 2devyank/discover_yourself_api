import express from 'express';
import { deleteproject, getproject, postproject, updateproject } from '../controller/ProjectController.js';
import { validateUser } from '../middleware/ValidateToken.js';
const projectrouter=express.Router();



projectrouter.route("/project/add").post(validateUser,postproject);
projectrouter.route("/project/get").get(validateUser,getproject);
projectrouter.route("/project/put/:id").put(updateproject);
projectrouter.route("/project/delete/:id").delete(deleteproject);

export default projectrouter;