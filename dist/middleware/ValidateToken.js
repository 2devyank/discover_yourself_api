"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');
// const NextFunction=require('express')
// import jwt,{JwtPayload} from "jsonwebtoken";
// import { SECRET_Key } from "../controller/UserController.js";
const { SECRET_Key } = require('../controller/UserController');
// export interface CustomRequest extends Request{
//     token:string;
// }
// interface Big{
//     user:u,
//     iat:string,
//     exp:string
// }
// interface u{
//     name:string,
//     eamil:string,id:number
// }
const validateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.status(401);
            throw new Error("Token not found");
        }
        const decoded = jwt.verify(token, SECRET_Key);
        // console.log(decoded);
        // (req as CustomRequest).token=decoded;
        res.locals.JwtPayload = decoded;
        res.locals.user = res.locals.JwtPayload.data;
        console.log(res.locals.JwtPayload.user.id);
        next();
    }
    catch (error) {
        console.log(error);
    }
};
module.exports = validateUser;
