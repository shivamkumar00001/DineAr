import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ownerSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: true,
      trim: true,
    },

    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    state: { type: String, trim: true },
    city: { type: String, trim: true },
    pincode: { type: String, trim: true },
    restaurantType: { type: String, trim: true },

    password: {
      type: String,
      required: true,
      select: false, // secure: password never returned
    },

    accountVerified: {
      type: Boolean,
      default: false,
    },

    // OTP SYSTEM
    verificationCode: { type: String }, // store as string (best practice)
    verificationCodeExpire: Date,

    resetOTP: { type: String }, // store as string (best practice)
    resetOTPExpire: Date,
  },
  { timestamps: true }
);

//
// ===============================
// 🔐 HASH PASSWORD BEFORE SAVE
// ===============================
ownerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//
// ===============================
// 🔐 COMPARE PASSWORD
// ===============================
ownerSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

//
// ===============================
// 🔢 GENERATE EMAIL VERIFICATION OTP
// ===============================
ownerSchema.methods.generateVerificationCode = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

  this.verificationCode = otp;
  this.verificationCodeExpire = Date.now() + 10 * 60 * 1000; // expires in 10 min

  return otp;
};

//
// ===============================
// 🔢 GENERATE FORGOT-PASSWORD OTP
// ===============================
ownerSchema.methods.generateResetOTP = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  this.resetOTP = otp;
  this.resetOTPExpire = Date.now() + 10 * 60 * 1000;

  return otp;
};

export const User = mongoose.model("User", ownerSchema);
