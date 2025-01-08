import bcrypt from "bcryptjs";  // Import bcrypt for password hashing
import UserModel from "../models/Users.js";

// Get all users
export const Getuser = async (req, res) => {
    try {
        const users = await UserModel.find();  // Fetch all users
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Internal server error in get user" });
    }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const checkAdmin = await UserModel.findById(id);

        if (checkAdmin.role === 'admin') {
            return res.status(409).json({ message: "You cannot delete yourself" });
        }

        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error in delete user" });
    }
};

// Add peon role
export const addPeon = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user with the same email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newPeon = new UserModel({
            name,
            classname: 'N/A',
            email,
            password: hashedPassword,  // Store hashed password
            role: 'peon',
        });

        await newPeon.save();
        res.status(201).json({ message: "Peon added successfully" ,newPeon});
    } catch (error) {
        console.error("Error adding peon:", error); // Log error for debugging
        res.status(500).json({ message: "Internal server error while adding peon" });
    }
};
