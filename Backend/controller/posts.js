import Post from '../models/PostSchema.js'
// console.log(Post);
import fs from 'fs';


export const createPost = async (req, res) => {
  try {
    const { caption, username } = req.body;
    const photoPath = req.file.path; // File path after upload

    // Read the file and convert it to Base64
    const base64Image = fs.readFileSync(photoPath, 'base64');
    const base64Url = `data:image/png;base64,${base64Image}`;

    const newPost = new Post({
      username,
      caption,
      photo: base64Url, // Store the Base64 string instead of file path
    });

    await newPost.save();
    req.io.emit('newPost', newPost);

    res.status(201).json({ message: 'Post created successfully', newPost });
  } catch (error) {
    console.error("Error in createPost:", error.stack);
    res.status(500).json({ error: error.message || 'Server error when creating post' });
  }
};


export const posts=async(req,res)=>{
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Fetch all posts from the database
    res.status(200).json(posts); // Send the posts back as a response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};