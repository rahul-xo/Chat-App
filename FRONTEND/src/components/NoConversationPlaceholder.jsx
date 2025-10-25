import React from "react"; // Added React import for completeness, as per standard practice
import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="size-20 bg-purple-600/10 rounded-full flex items-center justify-center mb-6">
        <MessageCircleIcon className="size-10 text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-200 mb-2">Select a conversation</h3>
      <p className="text-slate-400 max-w-md">
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;