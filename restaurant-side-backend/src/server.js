// ======================
// SERVER ENTRY POINT
// ======================

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

// Routes (ES Modules)
import authRoutes from "./routes/auth.Routes.js";
import menuRoutes from "./routes/menuRoutes.js";
import dishRoutes from "./routes/dishRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Socket handler
import socketHandler from "./config/socket.js";

dotenv.config();

const app = express();

// ======================
// CORS
// ======================
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// ======================
// Middlewares
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Debug Logger
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// ======================
// MongoDB Connection
// ======================
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Connection Error:", err));

// ======================
// HTTP + SOCKET.IO SERVER
// ======================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});

// Attach io to app
app.set("io", io);

// Load socket events
socketHandler(io);

// ======================
// ROUTES
// ======================
app.use("/api/auth", authRoutes);   // <--- Auth system
app.use("/api/v1", menuRoutes);     // <--- Menu
app.use("/api/v1", dishRoutes);     // <--- Dishes
app.use("/api/v1", orderRoutes);    // <--- Orders

// Healthcheck
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
