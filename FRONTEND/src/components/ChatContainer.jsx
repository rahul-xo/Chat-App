import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageLoader from "./MessageLoader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessageLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser?._id);
  }, [selectedUser]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-4 sm:px-6 overflow-y-auto py-6 sm:py-8 scrollbar-thin scrollbar-thumb-slate-700/50 scrollbar-track-transparent">
        {messages.length > 0 && !isMessageLoading ? (
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            {messages.map((msg) => {
              return (
                <div
                  key={msg._id}
                  className={`chat ${
                    msg.senderId === authUser._id ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble ${
                      msg.senderId === authUser._id
                        ? "bg-slate-700 text-slate-100"
                        : "bg-slate-800/70 text-slate-200"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-lg h-48 object-cover"
                      />
                    )}
                    {msg.text && <p className="mt-2">{msg.text}</p>}
                    <p className="text-xs mt-1 opacity-60">
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        ) : isMessageLoading ? (
          <MessageLoader />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;