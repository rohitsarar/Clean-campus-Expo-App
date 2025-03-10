import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/PostSchema.js';

import UserModel from '../models/Users.js';
import { sendNotificationEmail } from '../mailtrap/emailService.js';
// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_CLOUD_SECRET,
});

// Create Post
export const createPost = async (req, res) => {
  try {
    
    const file = req.files?.['Post'] || req.files?.Post;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }



    // Upload file to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(file.tempFilePath);

    const { caption, name } = req.body; // Extract caption and username from request body

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // e.g., "3/2/2025"
    const formattedTime = currentDate.toLocaleTimeString(); // e.g., "10:44 PM"
    // Create a new post with the Cloudinary URL
    const newPost = new Post({
      name,
      caption,
      photo: uploadResponse.secure_url, 
      postDate: formattedDate,
      postTime: formattedTime, 
    });
    console.log("Post added",newPost)

    await newPost.save();
    req.io.emit('newPost', newPost);

// Find all users with the 'peon' role
const peonUsers = await UserModel.find({ role: 'peon' });
const peonEmails = peonUsers.map(user => user.email);

// Send notification email to all peons
const taskMessage = `A new task has been created by ${name} with the caption: "${caption}". Please check  APP and take action.`;

// Send email notification to all peons
if (peonEmails.length > 0) {
  await sendNotificationEmail(peonEmails, taskMessage);
}




    res.status(201).json({
      message: 'Post submitted successfully',
      newPost: {
        ...newPost.toObject(), // Convert Mongoose document to plain object
        date: formattedDate,
        time: formattedTime,
      },
    });
  } catch (error) {
    console.error('Error in createPost:', error.stack);
    res.status(500).json({ error: error.message || 'Server error when creating post' });
  }
};

// Fetch Posts
export const posts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Fetch all posts sorted by creation date
    res.status(200).json(posts); // Return posts as JSON
  } catch (error) {
    console.error('Error fetching posts:', error.stack);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};
