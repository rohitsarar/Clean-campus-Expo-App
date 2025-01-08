import express from 'express'
import{ Getuser,addPeon,deleteUser }from '../controller/admin.js';
import isAdmin from '../middleware/verifyToken.js';


const adminroute=express.Router()

adminroute.get("/getuser",isAdmin,Getuser);
adminroute.post("/deleteuser/:id",isAdmin,deleteUser);
adminroute.post("/addpeon",isAdmin,addPeon);

export default adminroute;