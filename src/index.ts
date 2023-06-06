// import express,{Express,Request,Response} from "express";
// import dotenv from "dotenv";
// import cors from "cors";
const cors=require('cors')
const pool=require('./Database')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv');
const express=require('express');
const bodyParser=require('body-parser');
const registeruser=require('./controller/UserController')
const {Server}=require('socket.io');
const http=require('http')

const dot=dotenv.config();
const app=express();
// import bodyParser from "body-parser";

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());
app.use(express.json());


// import router from "./router/UserRouter.js";
const router=require('./router/UserRouter');
const projectrouter=require('./router/ProjectRouter')
const exprouter=require('./router/ExpRouter')
const feedrouter=require('./router/FeedRouter')
const conrouter=require('./router/ConRouter')
const mesrouter=require('./router/MessRouter')
// const feedrouter=require('./router/FeedRouter')
// import projectrouter from "./router/ProjectRouter.js";
// import exprouter from "./router/ExpRouter.js";
const server=http.createServer(app);

const io=new Server(server,{
cors:{
    origin:'http://localhost:3000',
    methods:['GET','POST'],
},
});





interface messdata{
    room:string,
    message:string,
    author:string,
    time:TimeRanges
}

io.on('connection',(socket:any)=>{
console.log(`User connected ${socket.id}` );

socket.on("join_room",(data:{room:string})=>{
    socket.join(data);
    console.log(`USer with ID :${socket.id} join room with ${data}`)
})
socket.on("send_message",(data:messdata)=>{
    console.log(data);
    socket.to(data.room).emit("receive_message",data);
})
socket.on('disconnect',()=>{
    console.log(`User disconnected ${socket.id}`);
})

 
})

const PORT=process.env.PORT;
app.use("/",router)
app.use("/",projectrouter)
app.use("/",exprouter)
app.use("/",feedrouter)
app.use("/",conrouter)
app.use("/",mesrouter)



app.post("/",(req:any,res:any)=>{
    res.send("meassage posted")
})
app.delete("/",(req:any,res:any)=>{
    res.send("meassage deleted")
})

server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})