import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {Toaster} from 'react-hot-toast';

const App = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden ">
      <Toaster/>
      <div className="absolute inset-0 z-0">
        <img
          src="../Images/background.jpeg"
          alt="Background"
          className="w-full h-full object-cover blur-md"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative ">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
