import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const InputField = ({ icon: Icon, type, name, placeholder, value, onChange }) => (
  <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
    <Icon className="text-gray-300" size={20} />
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
      required
      autoComplete={name}
      aria-label={placeholder}
    />
  </div>
);

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        formData,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Login successful!");
      setTimeout(() => navigate("/dashboard"), 1200);

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error. Check backend!");
      setFormData(prev => ({ ...prev, password: "" })); // clear password
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0F14] flex items-center justify-center px-4 py-10 relative">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/40"></div>

      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-10">
        <h1 className="text-3xl font-bold text-white text-center">Welcome Back</h1>
        <p className="text-gray-400 text-center mt-2">Login to manage your restaurant</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <InputField icon={Mail} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          <InputField icon={Lock} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          <div className="flex justify-end">
            <Link to="/forget" className="text-[#52B7FF] hover:underline text-sm">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-[#52B7FF] to-[#0058FF] shadow-lg transition-all duration-300
              ${loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-95"}`}
          >
            {loading ? <span className="animate-pulse">Logging in...</span> : "Login"}
          </button>
        </form>

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
