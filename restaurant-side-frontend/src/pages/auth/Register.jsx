import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Building2,
  Pin,
  ChefHat
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
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccessMsg("Registration Successful!");
      setLoading(false);

      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      setErrorMsg("Server error, try again later");
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

        {/* Status messages */}
        {errorMsg && (
          <p className="text-red-400 text-center mt-4">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-green-400 text-center mt-4">{successMsg}</p>
        )}

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>

          {/* Restaurant Name */}
          <InputBox icon={<Building2 size={20} />} name="restaurantName" placeholder="Restaurant Name" onChange={handleChange} />

          {/* Owner Name */}
          <InputBox icon={<User size={20} />} name="ownerName" placeholder="Owner Full Name" onChange={handleChange} />

          {/* Phone */}
          <InputBox icon={<Phone size={20} />} name="phone" placeholder="Phone Number" onChange={handleChange} />

          {/* Email */}
          <InputBox icon={<Mail size={20} />} name="email" placeholder="Email Address" type="email" onChange={handleChange} />

          {/* State */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <MapPin className="text-gray-300" size={20} />
            <select
              name="state"
              onChange={handleChange}
              className="w-full bg-transparent text-white focus:outline-none"
            >
              <option className="text-black">Select State</option>
              <option className="text-black">Bihar</option>
              <option className="text-black">Delhi</option>
              <option className="text-black">Uttar Pradesh</option>
              <option className="text-black">Maharashtra</option>
            </select>
          </div>

          {/* City */}
          <InputBox icon={<MapPin size={20} />} name="city" placeholder="City" onChange={handleChange} />

          {/* Pincode */}
          <InputBox icon={<Pin size={20} />} name="pincode" placeholder="Pincode" onChange={handleChange} />

          {/* Type */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <ChefHat className="text-gray-300" size={20} />
            <select
              name="type"
              onChange={handleChange}
              className="w-full bg-transparent text-white focus:outline-none"
            >
              <option className="text-black">Select Restaurant Type</option>
              <option className="text-black">Veg</option>
              <option className="text-black">Non-Veg</option>
              <option className="text-black">Café</option>
              <option className="text-black">Bakery</option>
              <option className="text-black">Fine Dining</option>
            </select>
          </div>

          {/* Password */}
          <InputBox icon={<Lock size={20} />} name="password" placeholder="Password" type="password" onChange={handleChange} />

          {/* Confirm Password */}
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

// Reusable Input field UI
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
