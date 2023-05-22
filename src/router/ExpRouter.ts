import express from 'express'
import { deleteexp, getexp, postexp, updateexp } from '../controller/ExpController.js';
import { validateUser } from '../middleware/ValidateToken.js';

const exprouter=express.Router();


exprouter.route("/exp").post(validateUser,postexp);
exprouter.route("/exp").get(validateUser,getexp);

exprouter.route("/exp/:id").put(updateexp).delete(deleteexp);

export default exprouter;
