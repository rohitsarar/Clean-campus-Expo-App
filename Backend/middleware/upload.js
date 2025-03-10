import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Allowed file types
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false); // Reject file
  }
};

// Multer upload middleware
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
  },
  fileFilter,
});

// Export the configured upload middleware
export default upload;
