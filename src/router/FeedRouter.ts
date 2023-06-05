const express=require('express');


const {getfeed}=require("../controller/FeedController")
const {updatefeed}=require("../controller/FeedController")
const {deletefeed}=require("../controller/FeedController")
const {postfeed}=require("../controller/FeedController")

const validateUser=require('../middleware/ValidateToken')
const feedrouter=express.Router();

feedrouter.route("/feed").post(validateUser,postfeed);
feedrouter.route("/feed").get(validateUser,getfeed);


feedrouter.route("/feed/:id").put(updatefeed).delete(deletefeed);
module.exports=feedrouter;