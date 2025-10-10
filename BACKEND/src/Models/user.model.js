import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    fullName:{
        type:String,
        required:true,
        minlength:3
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true})

userSchema.statics.hashPassword=async(password)=>{
    return await bcrypt.hash(password,10);
}

userSchema.methods.generateToken=function(){
    const token= jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}

const userModel=mongoose.model("user",userSchema);
export default userModel;