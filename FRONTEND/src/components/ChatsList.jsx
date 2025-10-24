import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUserLoading, setSelectedUser, selectedUser } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat, index) => {
        // Check online status inside the map for each chat
        const isOnline = onlineUsers.includes(chat._id);
        const isSelected = selectedUser?._id === chat._id;

        return (
          <div
            key={chat._id}
            className={`bg-slate-800/40 p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-slate-700/50 hover:scale-102 active:scale-98 animate-in fade-in slide-in-from-bottom-2 ${
              isSelected ? "bg-slate-700/60 ring-2 ring-slate-600/50 scale-102" : ""
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => setSelectedUser(chat)}
          >
            <div className="flex items-center gap-3">
              {/* Avatar div now uses 'relative' for positioning the dot */}
              <div className="avatar relative">
                <div className="size-10 sm:size-12 rounded-full ring-2 ring-slate-700/50 ring-offset-1 ring-offset-slate-900 transition-all duration-300 hover:ring-slate-600/60">
                  <img
                    src={chat.profilePic || "/Images/avatar.png"}
                    alt={chat.fullName}
                    className="rounded-full transition-transform duration-300 hover:scale-110"
                  />
                </div>
                {/* Online/Offline Dot */}
                <span
                  className={`absolute top-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-slate-900 ${
                    isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
              </div>
              <h4 className="text-slate-200 font-medium text-sm sm:text-base truncate transition-colors duration-300 hover:text-slate-100">
                {chat.fullName}
              </h4>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default ChatsList;