// import pg from "pg";
const pg=require('pg');

const pool=new pg.Pool({
    user:"devyanknagpal",
    password:"",
    host:"localhost",
    port:5433,
    database:"intern"
})

module.exports=pool;