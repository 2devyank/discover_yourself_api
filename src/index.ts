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

interface user {
id:string,
available:string,
room:string
}

const CHAT_BOT='ChatBot';
let chatRoom='';
let allUsers:user[]=[];
let chatRoomUsers:user[]=[];

io.on('connection',(socket:any)=>{
console.log(`User connected ${socket.id}` )

socket.on('join_room',(data: { available: string; room: string; })=>{
    const {available,room}=data;
    socket.join(room);
    
    let __cretedtime__=Date.now();
    socket.to(room).emit('receive_message',{
        message:`${available} has joined the chat room`,
        username:CHAT_BOT,
        __cretedtime__,
    }) 
    socket.emit('receive_message',{
        message:`Welcome ${available}`,
        username:CHAT_BOT,
        __cretedtime__,
    })
    chatRoom=room;
    allUsers.push({id:socket.id,available,room});
    chatRoomUsers=allUsers.filter((user)=>user.room===room);
    socket.to(room).emit('chatroom_users',chatRoomUsers);
    socket.emit('chatroom_users',chatRoomUsers);

})
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