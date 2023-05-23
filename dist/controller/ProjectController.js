"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteproject = exports.updateproject = exports.getproject = exports.postproject = void 0;
const Database_js_1 = require("../Database.js");
const postproject = async (req, res) => {
    try {
        const { id } = res.locals.JwtPayload.user;
        const { title, description, tags, source, deploy } = req.body;
        const result = Database_js_1.pool.query('insert into project (userid,title,description,tags,source,deploy) values ($1,$2,$3,$4,$5,$6)', [id, title, description, tags, source, deploy]);
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
};
exports.postproject = postproject;
const getproject = async (req, res) => {
    try {
        const { id } = res.locals.JwtPayload.user;
        const result = await Database_js_1.pool.query('select * from project where userid=$1', [id]);
        res.json(result.rows);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getproject = getproject;
const updateproject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tags, source, deploy } = req.body;
        const result = Database_js_1.pool.query('update project set title=$1,description=$2,tags=$3,source=$4,deploy=$5 where projectid=$6', [title, description, tags, source, deploy, id]);
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateproject = updateproject;
const deleteproject = async (req, res) => {
    try {
        const { id } = req.params;
        const result = Database_js_1.pool.query('delete from project where projectid=$1', [id]);
        res.json('deleted');
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteproject = deleteproject;
