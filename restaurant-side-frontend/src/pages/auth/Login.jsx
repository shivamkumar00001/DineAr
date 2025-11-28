import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login", // Correct backend URL
        formData,
        { withCredentials: true } // Important for cookies
      );

      toast.success(res.data.message || "Login successful!");
      setTimeout(() => navigate("/dashboard"), 1200); // Change if you don't have /dashboard route

    } catch (err) {
      toast.error(err.response?.data?.message || "Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0F14] flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/40"></div>

      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-10">

        <h1 className="text-3xl font-bold text-white text-center">Welcome Back</h1>
        <p className="text-gray-400 text-center mt-2">Login to manage your restaurant</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* Email */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <Mail className="text-gray-300" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <Lock className="text-gray-300" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/forget" // Correct frontend route
              className="text-[#52B7FF] hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-[#52B7FF] to-[#0058FF] shadow-lg hover:opacity-95 transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Redirect */}
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#52B7FF] hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
