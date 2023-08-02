"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { pool } from "../Database.js";
const pool = require('../Database');
// import {Response,Request} from "express";
const postexp = async (req, res) => {
    try {
        const { id } = res.locals.JwtPayload.user;
        const { position, organization, role, start, last } = req.body;
        const result = await pool.query('insert into experience (position,organization,role,start,last,userid) values ($1,$2,$3,$4,$5,$6)', [position, organization, role, start, last, id]);
        res.json(result.rows);
    }
    catch (error) {
        console.log(error);
    }
};
const updateexp = async (req, res) => {
    try {
        const { id } = req.params;
        const { position, organization, role, start, last } = req.body;
        const result = await pool.query('update experience set position=$1,organization=$2,role=$3,start=$4,last=$5 where expid=$6 ', [position, organization, role, start, last, id]);
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
};
const getexp = async (req, res) => {
    try {
        const { id } = res.locals.JwtPayload.user;
        const result = await pool.query('select * from experience where userid=$1', [id]);
        res.json(result.rows);
    }
    catch (error) {
        console.log(error);
    }
};
const getexpbyexpid = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('select * from experience where expid=$1', [id]);
        res.json(result.rows[0]);
    }
    catch (error) {
        console.log(error);
    }
};
const deleteexp = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('delete from experience where expid=$1', [id]);
        res.json('deleted');
    }
    catch (error) {
        console.log(error);
    }
};
module.exports = { postexp, updateexp, getexp, deleteexp, getexpbyexpid };
