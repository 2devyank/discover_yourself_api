import { pool } from "../Database.js";
import {Response,Request} from "express";
import bcrypt from "bcrypt";
import jwt,{Secret} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_Key:Secret='devyanknagpal';


interface registerouput{
    email:string,
password:string
}

const registeruser =async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            res.status(404);
            throw new Error("All fields are mendatory");
        }
        const hashpassword=await bcrypt.hash(password,10);
        const result=await pool.query("INSERT INTO PROFILE (email,password) VALUES($1,$2)",[email,hashpassword]);
        const rest:registerouput[]=result.rows;
        res.json(rest);
            }catch(error){
        console.log(error);
            }
}
const loginuser =async(req:Request,res:Response)=>{
    try{
const {email,password}=req.body;
if(!email||!password){
    res.status(404);
    throw new Error("email & password are amdatory");
}
    const user =await pool.query("SELECT * FROM PROFILE WHERE email=$1 ",[email]) 
    if(user&&(await bcrypt.compare(password,user.rows[0].password))){
        const accessToken =jwt.sign({
            user:{
                username:user.rows[0].name,
                email:user.rows[0].email,
                id:user.rows[0].id
            }
        }, SECRET_Key,
        {expiresIn:'1h'}

        )

   res.status(200).json({accessToken})
    }
    }catch(error){
        console.log(error);
    }
}

export {registeruser,loginuser};