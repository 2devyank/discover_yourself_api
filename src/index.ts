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
// import projectrouter from "./router/ProjectRouter.js";
// import exprouter from "./router/ExpRouter.js";
const server=http.createServer(app);

const io=new Server(server,{
cors:{
    origin:'http://localhost:3000',
    methods:['GET','POST'],
},
});



const CHAT_BOT='ChatBot';
let chatRoom='';

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
})
socket.on('disconnect',()=>{
    console.log(`User disconnected ${socket.id}`);
})

// socket.on('join_room',(data: { userref:string,available: string; })=>{
//     const {userref,available}=data;
//     socket.join(available);
    
//     let __cretedtime__=Date.now();
//     socket.to(available).emit('receive_message',{
//         message:`${userref} has joined the chat room`,
//         username:CHAT_BOT,
//         __cretedtime__,
//     }) 
//     socket.emit('receive_message',{
//         message:`Welcome ${userref}`,
//         username:CHAT_BOT,
//         __cretedtime__,
//     })
//     chatRoom=available;
//     allUsers.push({id:socket.id,userref,available});
//     chatRoomUsers=allUsers.filter((user)=>user.available===available);
//     socket.to(available).emit('chatroom_users',chatRoomUsers);
//     socket.emit('chatroom_users',chatRoomUsers);

// })
})

const PORT=process.env.PORT;
app.use("/",router)
app.use("/",projectrouter)
app.use("/",exprouter)



app.post("/",(req:any,res:any)=>{
    res.send("meassage posted")
})
app.delete("/",(req:any,res:any)=>{
    res.send("meassage deleted")
})

server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})