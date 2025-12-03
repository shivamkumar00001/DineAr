import jwt from "jsonwebtoken";
import { User } from "../models/Owner.model.js";
import ErrorHandler from "./error.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new ErrorHandler("Login first to access this resource", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid/Expired token", 401));
  }
};
