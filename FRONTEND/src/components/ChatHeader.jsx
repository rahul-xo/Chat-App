import React from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon, ArrowLeft } from "lucide-react"; // Import ArrowLeft
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser?._id);

  if (!selectedUser) return null; 

  return (
    <div
      className="flex justify-between items-center bg-slate-800/50 border-b
   border-slate-700/50 h-[84px] px-4 sm:px-6" 
    >
      <div className="flex items-center gap-3">
        <button className="md:hidden p-1 -ml-2 text-slate-400 hover:text-slate-200" onClick={() => setSelectedUser(null)}>
          <ArrowLeft size={20} />
        </button>

        <div className={`avatar`}>
           {isOnline && <span className="indicator-item badge badge-xs badge-success border-gray-700"></span>}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-1 ring-gray-600/50 ring-offset-base-100 ring-offset-1">
            <img
              src={selectedUser.profilePic || "/Images/avatar.png"}
              alt={selectedUser.fullName}
              onError={(e) => { e.target.onerror = null; e.target.src = "/Images/avatar.png" }}
            />
          </div>
        </div>

        <div className="flex-shrink min-w-0">
          <h3 className="text-slate-100 font-semibold text-sm sm:text-base truncate max-w-[150px] sm:max-w-xs">
            {selectedUser.fullName}
          </h3>
          <p className={`text-xs ${isOnline ? "text-emerald-400" : "text-gray-400"}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button className="hidden md:block p-1 text-slate-400 hover:text-slate-200 transition-colors" onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatHeader;