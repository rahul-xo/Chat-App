import messageModel from "../Models/message.model.js";
import userModel from "../Models/user.model.js";
import cloudinary from "../Services/cloudinary.service.js";
import { getReceiverSocketId, io } from "../Services/socket.js";

export const getContacts = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await userModel.find({ _id: { $ne: loggedInUser } });
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    const messages = await messageModel
      .find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  const loggedInUser = req.user._id;
  try {
    const filteredMessage = await messageModel.find({
      $or: [{ senderId: loggedInUser }, { receiverId: loggedInUser }],
    });

    const partnerIds = [
      ...new Set(
        filteredMessage.map((msg) =>
          msg.senderId.toString() === loggedInUser.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const Partners = await userModel.find({ _id: { $in: partnerIds } });
    res.status(200).json(Partners);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    if (!text && !image) {
      return res.status(400).json({ message: "Cannot send an empty message" });
    }
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageURL;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }

    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      text,
      image: imageURL,
    });

    const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};
