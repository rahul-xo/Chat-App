import jwt from 'jsonwebtoken'
import userModel from '../Models/user.model.js'
import { ENV } from '../Services/env.service.js'

export const socketAuthMiddleware=async(socket,next)=>{
    try {
        const token=socket.handshake.headers.cookie
        ?.split("; ")
        .find((row)=>row.startsWith("token="))
        ?.split("=")[1];
        if(!token){
            console.log("Token not provided");
            return next(new Error("Authentication error: Token not provided"));
        }
        //verify token
        const decoded=jwt.verify(token,ENV.JWT_SECRET);
        const user=await userModel.findById(decoded._id);
        if(!user){
            console.log("User not found");
            return next(new Error("Authentication error: User not found"));
        }
        socket.user=user;
        socket.userId=user._id.toString();
        console.log(`User ${user.fullName} authenticated successfully via socket`);
        next();

        
    } catch (error) {
        console.log("error in socket auth ",error.message);
        next(new Error("Authentication error"));
    }
}