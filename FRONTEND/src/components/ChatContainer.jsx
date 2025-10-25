import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageLoader from "./MessageLoader";
import MessageInput from "./MessageInput";
import { format } from "date-fns"; // Make sure this package is installed

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex flex-col h-full">
        <ChatHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400 text-lg">Select a contact to start messaging.</p>
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-transparent hover:scrollbar-thumb-purple-500/70">
        {isMessagesLoading ? (
          <MessageLoader />
        ) : messages.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id || msg.tempId}
                className={`chat ${ msg.senderId === authUser?._id ? "chat-end" : "chat-start"} animate-in fade-in`}
              >
                <div className="chat-image avatar">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full">
                    <img
                      alt="User avatar"
                      src={
                        msg.senderId === authUser?._id
                          ? authUser?.profilePic || "/Images/avatar.png"
                          : selectedUser?.profilePic || "/Images/avatar.png"
                      }
                      onError={(e) => { e.target.onerror = null; e.target.src="/avatar.png" }}
                    />
                  </div>
                </div>
                <div
                  className={`chat-bubble flex flex-col max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ${
                    msg.senderId === authUser?._id
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared content"
                      className="rounded-lg max-h-48 sm:max-h-60 object-cover mb-2"
                    />
                  )}
                  {msg.text && <p className="text-sm sm:text-base break-words">{msg.text}</p>}
                   {/* Changed Logic: Always show time if createdAt exists */}
                   <time className="text-xs opacity-70 mt-1 self-end">
                      {msg.createdAt ? format(new Date(msg.createdAt), "p") : ""}
                    </time>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName || "User"} />
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;