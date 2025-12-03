// controllers/auth.controller.js
import ErrorHandler, { errorMiddleware } from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/Owner.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";

// Helper: normalize and guard email
const normalizeEmail = (email = "") => (email || "").toString().trim().toLowerCase();

// ======= REGISTER =======
export const register = catchAsyncError(async (req, res, next) => {
  let {
    restaurantName,
    ownerName,
    email,
    phone,
    state,
    city,
    pincode,
    restaurantType,
    password,
    confirmPassword,
  } = req.body;

  email = normalizeEmail(email);

  if (!ownerName || !email || !phone || !password || !confirmPassword)
    return next(new ErrorHandler("Required fields missing.", 400));

  


  if (password !== confirmPassword)
    return next(new ErrorHandler("Password and confirm password do not match.", 400));

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password))
    return next(
      new ErrorHandler(
        "Password must be 8+ characters, include uppercase, lowercase and number.",
        400
      )
    );

  const existingVerified = await User.findOne({
    $or: [{ email }, { phone }],
    accountVerified: true,
  });

  if (existingVerified)
    return next(new ErrorHandler("Email or phone already in use.", 400));

  let user = await User.findOne({ email });

  if (user && !user.accountVerified) {
    user.restaurantName = restaurantName ?? user.restaurantName;
    user.ownerName = ownerName ?? user.ownerName;
    user.phone = phone ?? user.phone;
    user.state = state ?? user.state;
    user.city = city ?? user.city;
    user.pincode = pincode ?? user.pincode;
    user.restaurantType = restaurantType ?? user.restaurantType;
    user.password = password;
  } else if (!user) {
    user = await User.create({
      restaurantName,
      ownerName,
      email,
      phone,
      state,
      city,
      pincode,
      restaurantType,
      password,
    });
  }

  const code = user.generateVerificationCode();
  await user.save({ validateBeforeSave: false });

  const emailHtml = `<p>Your verification code is <strong>${code}</strong>. It will expire in 10 minutes.</p>`;
  await sendEmail({ email, subject: "Your verification code", message: emailHtml });

  return res.status(201).json({ success: true, message: "OTP sent to email." });
});

// ======= VERIFY REGISTRATION OTP =======
export const verifyRegistrationOTP = catchAsyncError(async (req, res, next) => {
  let { email, otp } = req.body;
  email = normalizeEmail(email);

  if (!email || !otp) return next(new ErrorHandler("Email and OTP required.", 400));

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("User not found.", 404));

  if (!user.verificationCode || user.verificationCode.toString() !== otp.toString())
    return next(new ErrorHandler("Invalid OTP.", 400));

  if (Date.now() > new Date(user.verificationCodeExpire).getTime())
    return next(new ErrorHandler("OTP expired.", 400));

  user.accountVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpire = undefined;

  await user.save({ validateBeforeSave: false });

  return sendToken(user, 200, "Account verified and logged in.", res);
});

// ======= LOGIN =======
export const login = catchAsyncError(async (req, res, next) => {
  let { email, password } = req.body;
  email = normalizeEmail(email);

  if (!email || !password) return next(new ErrorHandler("Please provide email and password.", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid credentials or account not verified.", 400));

  if (!user.accountVerified) return next(new ErrorHandler("Account not verified.", 400));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler("Invalid credentials.", 400));

  return sendToken(user, 200, "Logged in successfully.", res);
});

// ======= LOGOUT =======
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .status(200)
    .json({ success: true, message: "Logged out successfully." });
});

// ======= PROFILE =======
export const getProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new ErrorHandler("User not found.", 404));
  res.status(200).json({ success: true, user });
});

// ======= FORGOT PASSWORD =======
export const sendForgotOTP = catchAsyncError(async (req, res, next) => {
  let { email } = req.body;
  email = normalizeEmail(email);

  if (!email) return next(new ErrorHandler("Email required.", 400));

  const user = await User.findOne({ email, accountVerified: true });
  if (!user) return next(new ErrorHandler("User not found.", 404));

  const otp = user.generateResetOTP();
  await user.save({ validateBeforeSave: false });

  const emailHtml = `<p>Your password reset OTP is <strong>${otp}</strong>. It expires in 10 minutes.</p>`;
  await sendEmail({ email: user.email, subject: "Password Reset OTP", message: emailHtml });

  return res.status(200).json({ success: true, message: "Reset OTP sent to email." });
});

// ======= VERIFY FORGOT PASSWORD OTP =======
export const verifyForgotOTP = catchAsyncError(async (req, res, next) => {
  let { email, otp } = req.body;
  email = normalizeEmail(email);

  if (!email || !otp) return next(new ErrorHandler("Email and OTP required.", 400));

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler("User not found.", 404));

  if (!user.resetOTP || user.resetOTP.toString() !== otp.toString())
    return next(new ErrorHandler("Invalid OTP.", 400));

  if (Date.now() > new Date(user.resetOTPExpire).getTime())
    return next(new ErrorHandler("OTP expired.", 400));

  return res.status(200).json({ success: true, message: "OTP verified." });
});

// ======= RESET PASSWORD =======
export const resetPassword = catchAsyncError(async (req, res, next) => {
  let { email, otp, password, confirmPassword } = req.body;
  email = normalizeEmail(email);

  if (!email || !otp || !password || !confirmPassword)
    return next(new ErrorHandler("All fields are required.", 400));

  if (password !== confirmPassword) return next(new ErrorHandler("Passwords do not match.", 400));

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password))
    return next(new ErrorHandler("Password must be 8+ characters, include uppercase, lowercase and number.", 400));

  const user = await User.findOne({ email }).select("+resetOTP +resetOTPExpire +password");
  if (!user) return next(new ErrorHandler("User not found.", 404));

  if (!user.resetOTP || user.resetOTP.toString() !== otp.toString())
    return next(new ErrorHandler("Invalid OTP.", 400));

  if (Date.now() > new Date(user.resetOTPExpire).getTime())
    return next(new ErrorHandler("OTP expired.", 400));

  user.password = password;
  user.resetOTP = undefined;
  user.resetOTPExpire = undefined;

  await user.save();

  return sendToken(user, 200, "Password reset successfully and logged in.", res);
});
