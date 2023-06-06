const express=require('express')

const {postmessage}=require("../controller/MessageController");
const {getmessagebyconid}=require("../controller/MessageController");

const mesrouter=express.Router();

mesrouter.route("/message").post(postmessage);
mesrouter.route("/message/:id").get(getmessagebyconid);

module.exports=mesrouter;