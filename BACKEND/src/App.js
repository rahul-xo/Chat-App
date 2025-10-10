import express from 'express'
import userRoutes from './Routes/user.route.js'
const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello there");
})

app.use('/users',userRoutes);

// app.use('/user');


export default app;