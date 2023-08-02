"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pool = require('../Database');
const postconv = async (req, res) => {
    try {
        const { members } = req.body;
        const result = await pool.query('insert into conversations (members) values ($1)', [members]);
        res.json(result.rows);
    }
    catch (error) {
        console.log("error ocuured in postconv" + error);
    }
};
const getconvbyid = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('select * from conversations where $1=ANY(members)', [id]);
        res.json(result.rows);
    }
    catch (error) {
        console.log("error occured in getconv" + error);
    }
};
module.exports = { postconv, getconvbyid };
