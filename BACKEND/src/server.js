import http from 'http'
import app from './App.js'

import connectDB from './DB/db.js';
import { ENV } from './Services/env.service.js';

const PORT= ENV.PORT || 3000;

const server=http.createServer(app);


server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
});