import jwt from 'jsonwebtoken';
import UserModel from '../models/Users.js';  // Assuming you have a User model

const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        // Verify token and get decoded payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // Retrieve user from the database using the user ID from the token
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Check if the user is an admin
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized: User is not an admin" });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.error("Error in isAdmin middleware:", error.message);

        // Send a single response for errors
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export default isAdmin;
