import { create } from "zustand";
import { axiosInstance } from "../services/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoading: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdating:false,
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/users/register", data);
      set({ authUser: res.data });
      toast.success("Account created!");
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      const errMsg = error.response.data.errors || error.response.data.message;
      console.log(errMsg);
      toast.error(errMsg);
    } finally{
      set({isLoggingIn:false});
    }
  },

  logout:async()=>{
    try {
      const res=await axiosInstance.post('/users/logout');
      set({authUser:null});
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message);
    }
  },

  updateProfile:async(data)=>{
    set({isUpdating:true});
    try {
      const res=await axiosInstance.put("/users/update-profile",data);
      toast.success("profle updated successfully");
      set({authUser:res.data});
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally{
      set({isUpdating:false})
    }

  }
}));
