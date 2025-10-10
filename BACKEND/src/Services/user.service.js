import userModel from "../Models/user.model.js";

export const createUser = async ({
  fullName,
  email,
  password,
  profilePic,
}) => {
    return await userModel.create({
        email,
        password,
        fullName,
        profilePic
    })
};
