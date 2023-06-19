const pool=require('../Database')


const postfeed=async(req:any,res:any)=>{
    try{
        // const {id}=req.params;
        const {id}=res.locals.JwtPayload.user;
const {text,url,img}=req.body;
const result=await pool.query('insert into feed (text,profile_id,url,img) values ($1,$2,$3,$4)',[text,id,url,img])
res.json(result)   
}catch(error){
console.log(error);
    }
}

const updatefeed=async(req:any,res:any)=>{
    try{
        const {id}=req.params;
        const {text,url}=req.body;
        const result=await pool.query('update feed set text=$1,url=$3 where id=$2 ',[text,id,url])
        res.json(result);
    }catch(error){
console.log(error);
    }
}
const getfeed=async(req:any,res:any)=>{
    try{
        
        
        const result=await pool.query('select * from feed ');
        res.json(result.rows);
    }catch(error){
console.log(error);
    }
}
const deletefeed=async(req:any,res:any)=>{
    try{
        const {id}=req.params;
        const result=await pool.query('delete from feed where id=$1',[id]);
        res.json('deleted');

    }catch(error){
        console.log(error);
    }
}

module.exports={deletefeed,getfeed,updatefeed,postfeed};
