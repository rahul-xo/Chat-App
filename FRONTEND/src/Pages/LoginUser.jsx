import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function LoginUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn, authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-purple-400 mb-4 animate-in fade-in slide-in-from-top-4 duration-500" />
                  <h2 className="text-3xl font-bold text-slate-100 animate-in fade-in slide-in-from-top-5 duration-500">
                    Welcome Back!
                  </h2>
                  <p className="text-slate-400 mt-2 animate-in fade-in slide-in-from-top-6 duration-500">
                    Login to access your account.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="animate-in fade-in slide-in-from-left-8 duration-500">
                    <label className="text-sm font-medium text-slate-400 mb-2 block">Email</label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                        placeholder="johndoe@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="animate-in fade-in slide-in-from-left-10 duration-500">
                    <label className="text-sm font-medium text-slate-400 mb-2 block">Password</label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    className="w-full text-white font-semibold py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 rounded-lg "
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? <LoaderIcon className="w-6 h-6 animate-spin" /> : "Sign In"}
                  </button>
                </form>

                <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-5 duration-500">
                  <Link
                    to="/register"
                    className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                  >
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 border-l border-slate-800/50">
              <div className="text-center">
                <img
                  src="/Images/login.png"
                  alt="A person using a laptop"
                  className="w-full max-w-sm h-auto object-contain mx-auto"
                />
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-slate-200">Connect Anytime, Anywhere</h3>
                  <p className="text-slate-400 mt-2 max-w-xs mx-auto">
                    Stay connected with your community, no matter where you are.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default LoginUser;

