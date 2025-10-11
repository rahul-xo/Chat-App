import jwt from 'jsonwebtoken'
import { ENV } from '../Services/env.service.js';
import userModel from '../Models/user.model.js';

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token) res.status(401).json({message:"Unauthorized"});
    
    const decoded=jwt.verify(token,ENV.JWT_SECRET);
    if(!decoded) return res.status(401).json({message:"Unauthorized"});

    const user=await userModel.findById(decoded._id);
    if(!user) return res.status(401).json({message:"Unauthorized"});

    req.user=user;
    next();

  } catch (error) {
    console.log("error :",error.message);
    res.status(500).json({message:"Internal server error"});
  }
};
