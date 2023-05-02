import express,{Express,Request,Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
const dot=dotenv.config();
const app:Express=express();
import bodyParser from "body-parser";

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
app.use(express.json());

import {pool} from "./Database.js";
import router from "./router/UserRouter.js";



const PORT=process.env.PORT;
app.use("/",router)


app.post("/",(req:Request,res:Response)=>{
    res.send("meassage posted")
})
app.delete("/",(req:Request,res:Response)=>{
    res.send("meassage deleted")
})

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})