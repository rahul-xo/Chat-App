import { create } from "zustand";
import { axiosInstance } from "../services/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export const useAuthStore = create((set) => ({
  authUser: null,
  isLoading: true,
  isSigningUp:false,
  signup:async(data)=>{
    set({isSigningUp:true})
    try {
        const res=await axiosInstance.post("/users/register",data);
        set({authUser:res.data});
        toast.success("Account created!")

    } catch (error) {
        const errMsg=error.response.data.errors || error.response.data.message ;
        console.log(errMsg);
        toast.error(errMsg);
        
    } finally{
        set({isSigningUp:false})
    }
  },
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/users/check");
      set({ authUser: res.data});
    } catch (error) {
        console.log(error);
        set({authUser:null})
    } finally{
        set({isLoading:false})
    }
  },
}));
