import express from 'express';
import { AddProfilePicture } from '../controller/profileUpload.js';
import upload from '../middleware/upload.js';

const profilroute = express.Router();

// Route for uploading profile picture
profilroute.post('/upload-profile', upload.single('profilePicture'), AddProfilePicture);

export default profilroute;
