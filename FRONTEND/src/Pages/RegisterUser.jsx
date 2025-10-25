import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const { signup, isSigningUp, authUser } = useAuthStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit =async (e) => {
    e.preventDefault();
    await signup(formData);
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-purple-400 mb-4" />
                  <h2 className="text-3xl font-bold text-slate-100">
                    Create Your Account
                  </h2>
                  <p className="text-slate-400 mt-2">
                    Join the conversation today.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-slate-400 mb-2 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-400 mb-2 block">
                      Email
                    </label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-400 mb-2 block">
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button
                    className="w-full text-white font-semibold py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    type="submit"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <LoaderIcon className="w-6 h-6 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                  >
                    Already have an account? Login
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 border-l border-slate-800/50">
              <div className="text-center">
                <img
                  src="../Images/signup.png"
                  alt="A person messaging on a large phone"
                  className="w-full max-w-sm h-auto object-contain mx-auto"
                />
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-slate-200">
                    Connect Instantly
                  </h3>
                  <p className="text-slate-400 mt-2 max-w-xs mx-auto">
                    Join a fast, reliable, and private messaging platform.
                  </p>
                  <div className="mt-4 flex justify-center gap-3">
                    <span className="bg-slate-700/50 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full">
                      Free to Use
                    </span>
                    <span className="bg-slate-700/50 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full">
                      Secure
                    </span>
                    <span className="bg-slate-700/50 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full">
                      24/7 Support
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default SignUpPage;
