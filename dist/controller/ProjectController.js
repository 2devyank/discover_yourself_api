import { pool } from "../Database.js";
const postproject = async (req, res) => {
    try {
        const { id } = res.locals.JwtPayload.user;
        const { title, description, tags, source, deploy } = req.body;
        const result = pool.query('insert into project (userid,title,description,tags,source,deploy) values ($1,$2,$3,$4,$5,$6)', [id, title, description, tags, source, deploy]);
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
};
const getproject = async (req, res) => {
    try {
        const { id } = res.locals.JwtPayload.user;
        const result = await pool.query('select * from project where userid=$1', [id]);
        res.json(result.rows);
    }
    catch (error) {
        console.log(error);
    }
};
const updateproject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tags, source, deploy } = req.body;
        const result = pool.query('update project set title=$1,description=$2,tags=$3,source=$4,deploy=$5 where projectid=$6', [title, description, tags, source, deploy, id]);
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
};
const deleteproject = async (req, res) => {
    try {
        const { id } = req.params;
        const result = pool.query('delete from project where projectid=$1', [id]);
        res.json('deleted');
    }
    catch (error) {
        console.log(error);
    }
};
export { postproject, getproject, updateproject, deleteproject };
