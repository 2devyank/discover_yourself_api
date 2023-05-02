import { pool } from "../Database.js";
import {Response,Request} from "express";

const postexp=async(req:Request,res:Response)=>{
    try{
        const {id}=res.locals.JwtPayload.user;
const {position,organization,role,start,last}=req.body;
const result=await pool.query('insert into experience (position,organization,role,start,last,userid) values ($!,$2,$3,$4,$5,$6)',[position,organization,role,start,last,id])
res.json(result.rows)   
}catch(error){
console.log(error);
    }
}