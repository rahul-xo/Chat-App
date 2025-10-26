import { validationResult } from "express-validator";
import userModel from "../Models/user.model.js";
import { createUser } from "../Services/user.service.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../Services/env.service.js";
import cloudinary from "../Services/cloudinary.service.js";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Corrected: 7 days in milliseconds
    httpOnly: true,
    sameSite: "strict", // Start with strict, change to "lax" only if needed
    secure: ENV.NODE_ENV === 'production',
};

export const registerUser = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty())
            return res.status(400).json({ message: error.array()[0].msg }); // Use message key

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
        // Use consistent cookie options
        res.cookie("token", token, cookieOptions);

        try {
            await sendWelcomeEmail(
                createdUser.email,
                createdUser.fullName,
                ENV.CLIENT_URL
            );
        } catch (emailError) {
            console.log("Error sending welcome email:", emailError.message);
        }

        res.status(201).json({
             _id: createdUser._id,
             fullName: createdUser.fullName,
             email: createdUser.email,
             profilePic: createdUser.profilePic
        });
    } catch (error) {
        console.log("Error in registerUser:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const user = await userModel.findOne({ email }).select("+password");
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid email or password" });

        const token = user.generateToken();
        // Use consistent cookie options
        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("Error in loginUser:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logoutUser = (req, res) => {
    try {
        // Clear cookie using res.cookie with expiry in the past
        res.cookie("token", "", { ...cookieOptions, maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logoutUser:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// updateProfile remains mostly the same, just ensure error handling is robust
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic)
            return res.status(400).json({ message: "Profile pic is required" });

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const userId = req.user._id;
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
             return res.status(404).json({ message: "User not found"});
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in updateProfile:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};