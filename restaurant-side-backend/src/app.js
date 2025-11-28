import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.Routes.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config();

const app = express();

// === CORS ===
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// === Body parsers ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// === Debug logger ===
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// === Healthcheck ===
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running" });
});

// === Auth routes ===
app.use("/api/auth", authRoutes);

// === 404 handler ===
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// === Error handler ===
app.use(errorMiddleware);

export default app;
