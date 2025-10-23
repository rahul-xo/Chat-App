import React from "react";
import { useChatStore } from "../store/useChatStore";
import { MessageSquare, Users } from "lucide-react";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-2 sm:p-3 sticky top-0 bg-slate-900/50 backdrop-blur-xl z-10 border-b border-slate-700/30">
      <div
        role="tablist"
        className="tabs tabs-boxed bg-slate-800/60 p-1 sm:p-1.5 w-full rounded-lg shadow-lg"
      >
        <button
          role="tab"
          onClick={() => handleTabClick("chats")}
          className={`tab flex-1 flex items-center justify-center gap-2 transition-all duration-400 ease-in-out rounded-md ${
            activeTab === "chats"
              ? "bg-linear-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-lg scale-105"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 hover:scale-102"
          }`}
        >
          <MessageSquare size={16} className="hidden sm:inline-block transition-transform duration-300" />
          <span className="text-xs sm:text-sm">Chats</span>
        </button>

        <button
          role="tab"
          onClick={() => handleTabClick("contacts")}
          className={`tab flex-1 flex items-center justify-center gap-2 transition-all duration-400 ease-in-out rounded-md ${
            activeTab === "contacts"
              ? "bg-linear-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-lg scale-105"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 hover:scale-102"
          }`}
        >
          <Users size={16} className="hidden sm:inline-block transition-transform duration-300" />
          <span className="text-xs sm:text-sm">Contacts</span>
        </button>
      </div>
    </div>
  );
}
export default ActiveTabSwitch;