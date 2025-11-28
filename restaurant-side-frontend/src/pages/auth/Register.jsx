import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Building2,
  Pin,
  ChefHat,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    type: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      toast.success(res.data.message || "Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0F14] flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/40"></div>

      <div className="relative w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-10">
        <h1 className="text-3xl font-bold text-white text-center">
          Create Your Restaurant Account
        </h1>
        <p className="text-gray-400 text-center mt-2">
          Enter your business details to get started
        </p>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <InputBox icon={<Building2 size={20} />} name="restaurantName" placeholder="Restaurant Name" onChange={handleChange} />
          <InputBox icon={<User size={20} />} name="ownerName" placeholder="Owner Full Name" onChange={handleChange} />
          <InputBox icon={<Phone size={20} />} name="phone" placeholder="Phone Number" onChange={handleChange} />
          <InputBox icon={<Mail size={20} />} name="email" placeholder="Email Address" type="email" onChange={handleChange} />

          {/* State Select */}
          <SelectBox
            icon={<MapPin size={20} />}
            name="state"
            value={formData.state}
            onChange={handleChange}
            options={["Bihar", "Delhi", "Uttar Pradesh", "Maharashtra"]}
            placeholder="Select State"
          />

          <InputBox icon={<MapPin size={20} />} name="city" placeholder="City" onChange={handleChange} />
          <InputBox icon={<Pin size={20} />} name="pincode" placeholder="Pincode" onChange={handleChange} />

          {/* Type Select */}
          <SelectBox
            icon={<ChefHat size={20} />}
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={["Veg", "Non-Veg", "Café", "Bakery", "Fine Dining"]}
            placeholder="Select Restaurant Type"
          />

          <InputBox icon={<Lock size={20} />} name="password" placeholder="Password" type="password" onChange={handleChange} />
          <InputBox icon={<Lock size={20} />} name="confirmPassword" placeholder="Confirm Password" type="password" onChange={handleChange} />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-[#52B7FF] to-[#0058FF] shadow-lg hover:opacity-95 transition-all duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#52B7FF] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// Reusable Input field
function InputBox({ icon, name, type = "text", placeholder, onChange }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
      <span className="text-gray-300">{icon}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}

// Reusable Select field
function SelectBox({ icon, name, value, onChange, options, placeholder }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
      <span className="text-gray-300">{icon}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-white focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
