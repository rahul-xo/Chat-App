import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import ChatPage from "../Pages/ChatPage";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";

const AuthUser = ({ children }) => {
  const { authUser, checkAuth, isLoading } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (!authUser ? <Navigate to='/login'/> :children)


};

export default AuthUser;
