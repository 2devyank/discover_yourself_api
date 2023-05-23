// import express,{Express,Request,Response} from "express";
// import dotenv from "dotenv";
// import cors from "cors";
const cors=require('cors')
const pool=require('./Database')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv');
const express=require('express');
const bodyParser=require('body-parser');
const registeruser=require('./controller/UserController')

const dot=dotenv.config();
const app=express();
// import bodyParser from "body-parser";

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
app.use(express.json());


// import router from "./router/UserRouter.js";
const router=require('./router/UserRouter');
const projectrouter=require('./router/ProjectRouter')
const exprouter=require('./router/ExpRouter')
// import projectrouter from "./router/ProjectRouter.js";
// import exprouter from "./router/ExpRouter.js";



const PORT=process.env.PORT;
app.use("/",router)
app.use("/",projectrouter)
app.use("/",exprouter)



app.post("/",(req:any,res:any)=>{
    res.send("meassage posted")
})
app.delete("/",(req:any,res:any)=>{
    res.send("meassage deleted")
})

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})