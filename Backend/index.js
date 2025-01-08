import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import db from './db/db.js';
import authRoute from './route/authroute.js'
import adminroute from './route/adminroute.js';


dotenv.config();
const app=express();
const PORT=process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())



app.use('/api/auth',authRoute);
app.use('/api/admin', adminroute);

app.listen(PORT,async()=>{
    try{
        await db();
        console.log(`server running  on port ${PORT}`);

        
    }
    catch{
        
        console.error("Error connecting to mongoDB:",error.message);
        process.exit(1);
    }
})