import http from 'http'
import app from './App.js'
import dotenv from 'dotenv'
import connectDB from './DB/db.js';
dotenv.config();

const PORT= process.env.PORT || 3000;

const server=http.createServer(app);


server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});