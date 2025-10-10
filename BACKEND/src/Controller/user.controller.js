import { validationResult } from "express-validator";
import userModel from "../Models/user.model.js";
import { createUser } from "../Services/user.service.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../Services/env.service.js";

export const registerUser = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(400).json({ errors: error.array()[0].msg});
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

    const token =createdUser.generateToken();
    res.cookie("token",token,{
        maxAge: 7*24*60*60*60*1000,
        httpOnly:true,
        sameSite:"strict"
    });

    try {
      await sendWelcomeEmail(createdUser.email,createdUser.fullName,ENV.CLIENT_URL);
    } catch (error) {
      console.log(error.message);
    }
    
    res.status(201).json({ createdUser, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message:"Something broken up."});
  }
};
