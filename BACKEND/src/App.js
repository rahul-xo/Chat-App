import express from 'express'
import userRoutes from './Routes/user.route.js'
import cookieParser from 'cookie-parser'
const app=express();
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("hello there");
})

app.use('/users',userRoutes);

// app.use('/user');


export default app;