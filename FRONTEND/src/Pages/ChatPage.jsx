import React from "react";
import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatsList from "../components/ChatsList.jsx";
import ContactList from "../components/ContactList.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-7xl h-[85vh] md:h-[90vh] lg:h-[750px] shadow-2xl animate-in fade-in duration-500">
      <BorderAnimatedContainer>
        <div className={`md:w-[80px] w-full lg:w-80 bg-slate-900/40 backdrop-blur-lg flex flex-col border-r border-purple-800/30 transition-all duration-300 ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-2 space-y-2 
                      scrollbar-thin scrollbar-thumb-purple-600/50 scrollbar-track-slate-800/50 
                      hover:scrollbar-thumb-purple-500/70 transition-colors">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>
        <div className={`flex-1 flex flex-col bg-gradient-to-br from-slate-900/40 via-purple-950/10 to-slate-900/40 backdrop-blur-lg ${selectedUser ? 'flex' : 'hidden md:flex'}`}>
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;