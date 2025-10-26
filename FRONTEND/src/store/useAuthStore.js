import { create } from "zustand";
import { axiosInstance } from "../services/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoading: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdating: false,
  onlineUsers: [],
  socket: null,
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/users/register", data);
      set({ authUser: res.data });
      toast.success("Account created!");
      get().connectSocket();
    } catch (error) {
      const errMsg = error.response.data.errors || error.response.data.message;
      console.log(errMsg);
      toast.error(errMsg);
    } finally {
      set({ isSigningUp: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/users/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/users/login", data);
      set({ authUser: res.data });
      toast.success("logged in success");
      get().connectSocket();
    } catch (error) {
      const errMsg = error.response.data.errors || error.response.data.message;
      console.log(errMsg);
      toast.error(errMsg);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/users/logout");
      set({ authUser: null });
      toast.success(res.data.message);
      get().disconnectSocket();
    } catch (error) {
      console.log(error.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put("/users/update-profile", data);
      toast.success("profle updated successfully");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdating: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
    });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket.connected) {
      get().socket?.disconnect();
      set({ socket: null });
    }
  },
}));
