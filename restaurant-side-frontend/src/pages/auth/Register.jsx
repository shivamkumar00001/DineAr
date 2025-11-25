import { Link } from "react-router-dom";
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
  return (
    <div className="min-h-screen bg-[#0C0F14] flex items-center justify-center px-4 py-10">
      {/* Optional soft vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/40"></div>

      {/* Glassmorphism Card */}
      <div className="relative w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl p-10">

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center">
          Create Your Restaurant Account
        </h1>
        <p className="text-gray-400 text-center mt-2">
          Enter your business details to get started
        </p>

        {/* Form */}
        <form className="mt-10 space-y-6">
          
          {/* Restaurant Name */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <Building2 className="text-gray-300" size={20} />
            <input
              type="text"
              placeholder="Restaurant Name"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Owner Name */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <User className="text-gray-300" size={20} />
            <input
              type="text"
              placeholder="Owner Full Name"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <Phone className="text-gray-300" size={20} />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <Mail className="text-gray-300" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* State */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <MapPin className="text-gray-300" size={20} />
            <select className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none">
              <option className="text-black">Select State</option>
              <option className="text-black">Bihar</option>
              <option className="text-black">Delhi</option>
              <option className="text-black">Uttar Pradesh</option>
              <option className="text-black">Maharashtra</option>
            </select>
          </div>

          {/* City */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <MapPin className="text-gray-300" size={20} />
            <input
              type="text"
              placeholder="City"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Pincode */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <Pin className="text-gray-300" size={20} />
            <input
              type="text"
              placeholder="Pincode"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Restaurant Type */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <ChefHat className="text-gray-300" size={20} />
            <select className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none">
              <option className="text-black">Select Restaurant Type</option>
              <option className="text-black">Veg</option>
              <option className="text-black">Non-Veg</option>
              <option className="text-black">Café</option>
              <option className="text-black">Bakery</option>
              <option className="text-black">Fine Dining</option>
            </select>
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <Lock className="text-gray-300" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-xl">
            <Lock className="text-gray-300" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-[#52B7FF] to-[#0058FF] shadow-lg hover:opacity-95 transition-all duration-300"
          >
            Register
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#52B7FF] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
