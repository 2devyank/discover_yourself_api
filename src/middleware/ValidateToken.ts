import { NextFunction, Request, Response } from "express";
import jwt,{JwtPayload} from "jsonwebtoken";
import { SECRET_Key } from "../controller/UserController.js";

export interface CustomRequest extends Request{
    token:string|JwtPayload;
}
interface Big{
    user:u,
    iat:string,
    exp:string
}
interface u{
    name:string,
    eamil:string,id:number
}
const validateUser=async(req:Request,res:Response,next:NextFunction)=>{
try{

    const token=req.header('Authorization')?.replace('Bearer ','');
   
    if(!token){
        res.status(401);
        throw new Error("Token not found");
    }
    const decoded=jwt.verify(token,SECRET_Key);
    // console.log(decoded);
    // (req as CustomRequest).token=decoded;
    res.locals.JwtPayload=decoded;
    res.locals.user=res.locals.JwtPayload.data;
    console.log(res.locals.JwtPayload.user.id);
    next();
}catch(error){
    console.log(error);
}

} 

export {validateUser};