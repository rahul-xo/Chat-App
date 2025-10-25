import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

const MessageInput = () => {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const fileInputRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();
    
    // Create message data object
    const messageData = { text: text.trim(), image: imagePreview };

    // Clear state immediately for optimistic UI feel
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;

    // Send the message
    console.log(messageData);
    await sendMessage(messageData);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; 
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };
  return (
    <div className="p-4 border-t border-slate-700/50">
      {imagePreview && (
        <div className="max-w-4xl mx-auto mb-3 flex items-center animate-in scale-95 fade-in duration-300">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-700 shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-purple-700/50 hover:text-white transition duration-200"
              type="button"
              aria-label="Remove image"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-3"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (isSoundEnabled) playRandomKeyStrokeSound();
          }}
          className="flex-1 bg-slate-800/70 border border-slate-700/50 rounded-lg py-2.5 px-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-200"
          placeholder="Type your message..."
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2.5 rounded-lg transition-colors duration-200 ${
            imagePreview 
              ? "bg-purple-700/30 text-purple-300 hover:bg-purple-700/50" 
              : "bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-purple-900/30"
          }`}
          aria-label="Attach image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2.5 rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          aria-label="Send message"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;