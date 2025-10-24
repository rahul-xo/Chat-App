import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../services/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    } 
  },

  sendMessage:async(messageData)=>{
    const {selectedUser,messages}=get();
    const {authUser}=useAuthStore.getState();
    const optimisticMessage={
      _id:Date.now().toString(),
      senderId:authUser._id,
      receiverId:selectedUser._id,
      text:messageData.text,
      image:messageData.image,
      createdAt:new Date().toISOString(),
      isOptimistic:true,
    }
    set({messages:[...messages,optimisticMessage]});
    try {
      const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
      set((state)=> state.messages.map((msg)=> msg._id===optimisticMessage._id ? res.data : msg));
      
    } catch (error) {
      set({messages:messages});
      toast.error(error.response.data.message || "Failed to send message");
    }

  },

  subscribeToMessages:()=>{
    const {selectedUser,isSoundEnabled}=get();
    if(!selectedUser) return;

    const socket=useAuthStore.getState().socket;
    socket.on("newMessage",(newMessage)=>{
      const isMessageSentFromSelectedUser=newMessage.senderId===selectedUser._id;
      if(!isMessageSentFromSelectedUser) return;

      const currentMessages=get().messages;
      set({messages:[...currentMessages,newMessage]});
      if(isSoundEnabled){
        const notficationSound=new Audio("./sounds/notification.mp3");
        notficationSound.currentTime=0; // Reset to start
        notficationSound.play().catch((err)=> console.log("Audio play error:",err)); // Play sound
      }

    })
  },

  unsubscribeFromMessages:()=>{
    const socket=useAuthStore.getState().socket;
    socket.off("newMessage");
  }
}));
