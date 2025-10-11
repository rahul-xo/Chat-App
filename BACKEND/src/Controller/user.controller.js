import { validationResult } from "express-validator";
import userModel from "../Models/user.model.js";
import { createUser } from "../Services/user.service.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../Services/env.service.js";
import cloudinary from "../Services/cloudinary.service.js";

export const registerUser = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(400).json({ errors: error.array()[0].msg });
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
      maxAge: 7 * 24 * 60 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    try {
      await sendWelcomeEmail(
        createdUser.email,
        createdUser.fullName,
        ENV.CLIENT_URL
      );
    } catch (error) {
      console.log(error.message);
    }

    res.status(201).json({ createdUser, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something broken up." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });
  const user = await userModel.findOne({ email }).select("+password");
  if (!user)
    return res.status(400).json({ message: "invalid email or password" });

  const isUser = await user.comparePassword(password);

  if (!isUser)
    return res.status(400).json({ message: "invalid email or password" });
  const token = user.generateToken();
  res.cookie("token", token);

  res.status(200).json({ user, token });
};

export const logoutUser = (_, res) => {
  res.clearCookie("token", { maxAge: 0 });

  res.status(200).json({ message: "logged out success" });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "profile pic is required" });

    const uploadeResponse = await cloudinary.uploader.upload(profilePic);

    const user = req.user;
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { profilePic: uploadeResponse.secure_url },
      { new: true }
    );

    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:"Internal server error"})
  }
};
