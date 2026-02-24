import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
    <div className="min-h-[100dvh] bg-[#EAF4FF] flex items-center justify-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm">

        {/* Back Arrow */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center rounded-full p-2 -ml-2 mb-4 sm:mb-6 hover:bg-gray-100 transition"
          aria-label="Go back"
        >
          <ArrowLeft className="cursor-pointer" />
        </button>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 text-center">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3.5 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB1B1]"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3.5 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFB1B1]"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <span className="text-sm text-[#FFB1B1] cursor-pointer">
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-[#FFB1B1] text-white py-3.5 rounded-xl font-medium hover:opacity-90 transition"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={loginWithGoogle}
          className="w-full border border-gray-300 py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Bottom Text */}
        <p className="text-center text-sm mt-6 leading-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#FFB1B1] font-medium cursor-pointer"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
