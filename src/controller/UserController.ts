// import { pool } from "../Database.js";
const pool=require('../Database')
// import {Response,Request} from "express";
// import bcrypt from "bcrypt";
const bcrypt=require('bcrypt')
// import jwt,{Secret} from "jsonwebtoken";
const jwt=require('jsonwebtoken');
// import dotenv from "dotenv";
const dotenv=require('dotenv');
dotenv.config();


// import { CustomRequest } from "../middleware/ValidateToken.js";
 const SECRET_Key='devyanknagpal';




const registeruser =async(req:any,res:any)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            res.status(404);
            throw new Error("All fields are mendatory");
        }
        const hashpassword=await bcrypt.hash(password,10);
        const result=await pool.query("INSERT INTO PROFILE (email,password) VALUES($1,$2)",[email,hashpassword]);
      
        res.json(result);
            }catch(error){
        console.log(error);
            }
}
const loginuser =async(req:any,res:any)=>{
    try{
const {email,password}=req.body;
if(!email||!password){
    res.status(404);
    throw new Error("email & password are amdatory in login");
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
        {expiresIn:'2h'}

        )

   res.status(200).json({accessToken})
    }
    }catch(error){
        console.log(error);
    }
}

const getuser=async(req:any,res:any)=>{
    try{
const {id}=res.locals.JwtPayload.user;
console.log(id);

const ret=await pool.query('select * from profile where id=$1',[id])
res.json(ret.rows[0])
    }catch(error){
console.log(error);
    }

}
const getuserbyid=async(req:any,res:any)=>{
    try{
const {id}=req.params;
const ret=await pool.query('select * from profile where id=$1',[id])
res.json(ret.rows[0])
    }catch(error){
console.log(error);
    }

}

const updateuser=async(req:any,res:any)=>{
    try{
       
const {id}=req.params;

        const {name,email,skills,portfoilo,expertise,about,available}=req.body;
const ret=await pool.query('update profile set name=$1,email=$2,skills=$3,portfoilo=$4,expertise=$5,about=$6,available=$7 where id=$8',[name,email,skills,portfoilo,expertise,about,available,id])
   res.json(ret.rows)
}catch(error){
        console.log(error);
    }
}
const getalluser=async(req:any,res:any)=>{
    try{
const filter=req.query;
// if(Object.values(filter)÷)

console.log(filter.skills);
const filterarray=filter.skills.split(',');
console.log(filterarray);

const page=req.query.page;
const limit=req.query.limit;

const offset=page*limit;
console.log(offset);

filterarray.map((data:string)=>{
    console.log(data);
})
if(filter.skills==='' && filter.available===''){
   
    const ret=await pool.query('select * from profile offset $1 limit $2',[offset,limit]);
    res.json(ret.rows)
}else{
   
       const ret=await pool.query('select * from profile where $1=ANY(skills) or $2=ANY(available)',[filterarray,filter.available]);
    res.json(ret.rows)
}

    }catch(error){
console.log(error);
    }

}

// module.exports=registeruser
module.exports={registeruser,loginuser,getuser,updateuser,getalluser,getuserbyid,SECRET_Key};