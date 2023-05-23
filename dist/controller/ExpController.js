"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteexp = exports.getexp = exports.updateexp = exports.postexp = void 0;
const Database_js_1 = require("../Database.js");
const postexp = async (req, res) => {
    try {
        const { id } = res.locals.JwtPayload.user;
        const { position, organization, role, start, last } = req.body;
        const result = await Database_js_1.pool.query('insert into experience (position,organization,role,start,last,userid) values ($1,$2,$3,$4,$5,$6)', [position, organization, role, start, last, id]);
        res.json(result.rows);
    }
    catch (error) {
        console.log(error);
    }
};
exports.postexp = postexp;
const updateexp = async (req, res) => {
    try {
        const { id } = req.params;
        const { position, organization, role, start, last } = req.body;
        const result = await Database_js_1.pool.query('update experience set position=$1,organization=$2,role=$3,start=$4,last=$5 where expid=$6 ', [position, organization, role, start, last, id]);
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateexp = updateexp;
const getexp = async (req, res) => {
    try {
        const { id } = res.locals.JwtPayload.user;
        const result = await Database_js_1.pool.query('select * from experience where userid=$1', [id]);
        res.json(result.rows);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getexp = getexp;
const deleteexp = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Database_js_1.pool.query('delete from experience where expid=$1', [id]);
        res.json('deleted');
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteexp = deleteexp;
