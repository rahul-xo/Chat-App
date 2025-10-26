import {Server} from "socket.io";
import { ENV } from "./env.service.js";
import { socketAuthMiddleware } from "../Middleware/socketAuth.middleware.js";


const userSocketMap={};
let io;
export const initializeSocketIO=(server)=>{
     io=new Server(server,{
        cors:{
            origin: [ENV.CLIENT_URL],
            credentials:true
        }
    })
    console.log(ENV.CLIENT_URL);
    io.use(socketAuthMiddleware);

    io.on("connection",(socket)=>{
        console.log(`New client connected: ${socket.userId}, User: ${socket.user.fullName}`);
        const userId=socket.userId;
        userSocketMap[userId]=socket.id;
    
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    
        socket.on("disconnect",()=>{
            console.log(`Client disconnected: ${socket.userId}, User: ${socket.user.fullName}`);
            delete userSocketMap[userId];
            io.emit("getOnlineUsers",Object.keys(userSocketMap));
        })
    });
    return io;
}

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

export { io, userSocketMap };




