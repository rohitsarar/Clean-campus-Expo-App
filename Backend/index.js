import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import db from './db/db.js';
import authRoute from './route/authroute.js';
import adminroute from './route/adminroute.js';
import http from 'http';
import postRoute from './route/postroute.js';
import initSocket from './socket/socket.js';
import profilroute from './route/profile.js';
import fileUpload from 'express-fileupload';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
// Database connection
const server = http.createServer(app);
const io = initSocket(server);
app.use('/uploads', express.static('uploads'));

// Pass Socket.IO instance to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/admin', adminroute);
app.use('/api', postRoute);
app.use('/api', profilroute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
server.listen(PORT, async () => {
  try {
    await db();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
});
