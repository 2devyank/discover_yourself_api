import { NextFunction, Request, Response } from "express";
import jwt,{JwtPayload} from "jsonwebtoken";
import { SECRET_Key } from "../controller/UserController.js";

export interface CustomRequest extends Request{
    token:string|JwtPayload;
}
const validateUser=async(req:Request,res:Response,next:NextFunction)=>{
try{

    const token=req.header('Authorization')?.replace('Bearer ','');
   
    if(!token){
        res.status(401);
        throw new Error();
    }
    const decoded=jwt.verify(token,SECRET_Key);
    console.log(decoded);
    (req as CustomRequest).token=decoded;
    console.log(req);
    next();
}catch(error){
    console.log(error);
}

} 

export {validateUser};