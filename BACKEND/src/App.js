import express from 'express'
const app=express();
import userRoutes from './Routes/user.route.js'

app.get('/',(req,res)=>{
    res.send("hello there");
})

app.use('/users',userRoutes);

// app.use('/user');


export default app;