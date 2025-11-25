import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C0F14] px-4">
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
        <h1 className="text-3xl font-semibold text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Login to continue managing your restaurant
        </p>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm">Email Address</label>
            <div className="mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <div className="mt-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute right-4 top-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button type="button" className="text-blue-400 text-sm hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-[#52B7FF] to-[#0058FF] shadow-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{' '}
          <a href="#" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
