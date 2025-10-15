import express from 'express'
import userRoutes from './Routes/user.route.js'
import cookieParser from 'cookie-parser'
import messageRoutes from './Routes/message.routes.js'
import cors from 'cors'
import { ENV } from './Services/env.service.js'
const app=express();
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("hello there");
})

app.use('/users',userRoutes);
app.use('/messages',messageRoutes);

// app.use('/user');


export default app;