import express from "express";
import { registerUser } from "../Controller/user.controller.js";
import {body} from 'express-validator'
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

export default router;
