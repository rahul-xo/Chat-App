import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const {
    getAllContacts,
    allContacts,
    setSelectedUser,
    isUserLoading,
    selectedUser,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact, index) => (
        <div
          key={contact._id}
          className={`bg-slate-800/40 p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-slate-700/50 hover:scale-102 active:scale-98 animate-in fade-in slide-in-from-bottom-2 ${
            selectedUser?._id === contact._id
              ? "bg-slate-700/60 ring-2 ring-slate-600/50 scale-102"
              : ""
          }`}
          style={{ animationDelay: `${index * 50}ms` }}
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className="size-10 relative sm:size-12 rounded-full ring-2 ring-slate-700/50 ring-offset-1 ring-offset-slate-900 transition-all duration-300 hover:ring-slate-600/60">
              <span
                className={`absolute top-0 right-0 block h-2.5 w-2.5 rounded-full border-2 border-slate-900 ${
                  onlineUsers.includes(contact._id)
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              />
              <img
                src={contact.profilePic || "/Images/avatar.png"}
                alt={contact.fullName}
                className="rounded-full transition-transform duration-300 h-full w-full object-cover hover:scale-110"
              />
            </div>
            <h4 className="text-slate-200 font-medium text-sm sm:text-base truncate transition-colors duration-300 hover:text-slate-100">
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;
