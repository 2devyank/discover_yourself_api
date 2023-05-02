import express from 'express';
import { deleteproject, getproject, postproject, updateproject } from '../controller/ProjectController.js';
import { validateUser } from '../middleware/ValidateToken.js';
const projectrouter=express.Router();



projectrouter.route("/project").post(validateUser,postproject);
projectrouter.route("/project").get(validateUser,getproject);
projectrouter.route("/project/:id").put(updateproject);
projectrouter.route("/project/:id").delete(deleteproject);

export default projectrouter;