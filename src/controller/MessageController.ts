const pool = require('../Database')


const postmessage = async (req: any, res: any) => {
    try {

        const { text, con_id, sender } = req.body;
        const result = await pool.query('insert into messages (con_id,text,sender) values ($1,$2,$3)', [con_id, text, sender])

        res.json(result.rows)
    } catch (error) {
        console.log(error);
    }
}
const getmessagebyconid = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const result = await pool.query('select * from messages where con_id=$1', [id]);
        res.json(result.rows);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { postmessage, getmessagebyconid };