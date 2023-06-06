const pool=require('../Database')

const postconv=async(req:any,res:any)=>{
    try{
        
const {members}=req.body;
const result=await pool.query('insert into conversations (members) values ($1)',[members])
res.json(result.rows)   
}catch(error){
console.log(error);
    }
}
const getconvbyid=async(req:any,res:any)=>{
    try{
        const {id}=req.params;

const result=await pool.query('select * from conversations where $1=ANY(members)',[id]);
res.json(result.rows)   
}catch(error){
console.log(error);
    }
}

module.exports={postconv,getconvbyid};