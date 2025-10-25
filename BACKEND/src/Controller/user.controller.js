import { validationResult } from "express-validator";
import userModel from "../Models/user.model.js";
import { createUser } from "../Services/user.service.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../Services/env.service.js";
import cloudinary from "../Services/cloudinary.service.js";

// Minimal changes applied
export const registerUser = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty())
            // Send only the message for consistency
            return res.status(400).json({ message: error.array()[0].msg });
        const { email, password, fullName, profilePic } = req.body;

        const user = await userModel.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already in Use" });

        const hashedPassword = await userModel.hashPassword(password);
        const createdUser = await createUser({
            email,
            password: hashedPassword,
            fullName,
            profilePic,
        });

        const token = createdUser.generateToken();
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // Corrected maxAge calculation
            httpOnly: true,
            sameSite: "lax",
            secure: ENV.NODE_ENV === 'production' // Added secure flag
        });

        try {
            await sendWelcomeEmail(
                createdUser.email,
                createdUser.fullName,
                ENV.CLIENT_URL
            );
        } catch (emailError) {
            console.log("Error sending welcome email:", emailError.message);
            // Don't block registration if email fails, just log it
        }

        // Send only necessary user data
        res.status(201).json({
             _id: createdUser._id,
             fullName: createdUser.fullName,
             email: createdUser.email,
             profilePic: createdUser.profilePic
        });
    } catch (error) {
        console.log("Error in registerUser:", error.message);
        res.status(500).json({ message: "Internal Server Error" }); // Standard message
    }
};

export const loginUser = async (req, res) => {
    // Added try...catch block
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const user = await userModel.findOne({ email }).select("+password");
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });

        const isPasswordCorrect = await user.comparePassword(password); // Renamed variable

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid email or password" });

        const token = user.generateToken();
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // Added cookie options
            httpOnly: true,
            sameSite: "lax",
            secure: ENV.NODE_ENV === 'production' // Added secure flag
        });

        // Send only necessary user data (exclude password)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error in loginUser:", error.message);
        res.status(500).json({ message: "Internal Server Error" }); // Standard message
    }
};

export const logoutUser = (req, res) => {
    // Added try...catch block
    try {
        // Use res.cookie to clear for better compatibility
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: "lax",
            secure: ENV.NODE_ENV === 'production' // Added secure flag
        });
        res.status(200).json({ message: "Logged out successfully" }); // Standardized message
    } catch (error) {
        console.log("Error in logoutUser:", error.message);
        res.status(500).json({ message: "Internal Server Error" }); // Standard message
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic)
            return res.status(400).json({ message: "Profile pic is required" });

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const userId = req.user._id; // Use userId directly
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        ).select("-password"); // Exclude password from the result

        if (!updatedUser) {
             return res.status(404).json({ message: "User not found"});
        }

        res.status(200).json(updatedUser); // Use 200 OK for updates
    } catch (error) {
        console.log("Error in updateProfile:", error.message);
        res.status(500).json({ message: "Internal server error" }); // Standardized message
    }
};