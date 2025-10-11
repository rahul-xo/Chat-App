import express from "express";
import { loginUser, logoutUser, registerUser, updateProfile } from "../Controller/user.controller.js";
import {body} from 'express-validator'
import { authUser } from "../Middleware/auth.middleware.js";
const router = express();

router.post(
  "/register",
  [
    body("email").notEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("fullName").notEmpty().withMessage("full name is required"),
    body("fullName")
      .isLength({ min: 3 })
      .withMessage("fullName must be alteast 3 character long"),
    body("password").notEmpty().withMessage("password is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 character long"),
  ],
  registerUser
);


router.post('/login',loginUser);

router.post('/logout',logoutUser);

router.put("/update-profile",authUser,updateProfile);

router.get('/check',authUser,(req,res)=> res.status(200).json(req.user));
export default router;
