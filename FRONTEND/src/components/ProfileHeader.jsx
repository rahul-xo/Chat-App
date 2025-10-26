import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleSoundToggle = () => {
    if (isSoundEnabled) {
      mouseClickSound.currentTime = 0;
      mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
    }
    toggleSound();
  };


  return (
    <div className='p-3 sm:p-4 border-b border-slate-700/50 bg-linear-to-r from-slate-900/20 to-transparent'>
      <div className='flex items-center gap-4 justify-between'>
        <div className='flex items-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-left-2 duration-500'>
          <div className='avatar '>
            <div className='w-12 sm:w-14 rounded-full relative group cursor-pointer ring-2 ring-slate-700/50 ring-offset-2 ring-offset-slate-900 hover:ring-slate-600/60 transition-all duration-300 hover:scale-105' onClick={() => fileInputRef.current.click()}>
              <img
                src={selectedImg || authUser.profilePic || "./Images/avatar.png"}
                alt='User profile'
                className='w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2'
              />
              <div className='absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-700/60 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 rounded-full pointer-events-none'>
                <span className='text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300'>Change</span>
              </div>
            </div>
          </div>

          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImageUpload}
            className='hidden'
          />

          <div className="flex-1 min-w-0"> 
            <h3 className='text-slate-100 font-semibold text-sm sm:text-base leading-tight break-words pr-2'>
              {authUser.fullName}
            </h3>
            <p className='text-emerald-400 text-xs font-medium flex items-center gap-1.5'>
              <span className='w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse'></span>
              Online
            </p>
          </div>
        </div>

        <div className='flex gap-1.5 sm:gap-2 items-center animate-in fade-in slide-in-from-right-2 duration-500 delay-100'>
          <div className="tooltip  tooltip-bottom" data-tip="Logout">
            <button
              className='p-1.5 sm:p-2 rounded-full text-slate-400 hover:bg-slate-700/60 hover:text-slate-200 transition-all duration-300 hover:scale-110 active:scale-95'
              onClick={logout}
            >
              <LogOutIcon className='size-4 sm:size-5' />
            </button>
          </div>

          <div className="tooltip tooltip-bottom" data-tip={isSoundEnabled ? "Sound Off" : "Sound On"}>
            <button
              className='p-1.5 sm:p-2 rounded-full text-slate-400 hover:bg-slate-700/60 hover:text-slate-200 transition-all duration-300 hover:scale-110 active:scale-95'
              onClick={handleSoundToggle}
            >
              {isSoundEnabled ? (
                <Volume2Icon className='size-4 sm:size-5 animate-pulse' />
              ) : (
                <VolumeOffIcon className='size-4 sm:size-5' />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileHeader;