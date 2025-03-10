import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';  // Import uuidv4 for unique filenames
import profilePictureModel from '../models/profilepicture.js'; // Import the profile picture model

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up local storage with multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');  // Upload folder
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));  // Unique filename
  },
});

const upload = multer({ storage });

// Controller Function to Handle Profile Upload
export const AddProfilePicture = async (req, res) => {
  try {
    const file = req.file;
    console.log('Received body:', req.body);
    console.log('Received file:', req.file);

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Log the uploaded file information
    console.log('Uploaded File:', file);

    // Upload the file to Cloudinary in the "Images" folder
    cloudinary.uploader.upload(file.path, { 
      folder: 'Images',  // Specify the folder name in Cloudinary
    }, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
      }

      // Save the Cloudinary URL to the database (MongoDB)
      const newProfilePicture = new profilePictureModel({
        userId: req.body.userId, // Assuming the userId is passed in the request body
        profilePictureUrl: result.secure_url, // The Cloudinary URL returned
      });

      // Save the profile picture document to MongoDB
      await newProfilePicture.save();

      // Send response with Cloudinary URL
      res.status(200).json({
        message: 'Profile picture uploaded successfully',
        url: result.secure_url, // Cloudinary URL of the uploaded image
      });
    });
   
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file', error });
  }
};
