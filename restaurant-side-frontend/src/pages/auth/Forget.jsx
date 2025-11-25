import { Mail } from "lucide-react";

export default function Forget() {
  return (
    <div className="min-h-screen bg-[#0C0F14] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#161B22] p-8 rounded-2xl shadow-xl border border-[#1F242B]">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Forgot Password
        </h2>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Enter your email to receive a password reset link.
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Email Address</label>
          <div className="flex items-center bg-[#0C0F14] border border-gray-700 rounded-lg px-3 py-2">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-white outline-none w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        {/* <button  className="text-blue-400 hover:text-blue-500 transition font-medium" transition text-black font-semibold py-3 rounded-lg mb-4">
          Send Reset Link
        </button> */}
        <button
  className="w-full bg-gradient-to-r from-[#52B7FF] to-[#0058FF] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
>
  Send Reset Link
</button>

        {/* Back to Login */}
        <p className="text-center text-gray-400 text-sm">
          Back to{" "}
          <a href="/login" className="text-blue-400 hover:text-blue-500 transition font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
