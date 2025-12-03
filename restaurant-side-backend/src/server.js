const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// ===== CORS FIX =====
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// ===== Body Parsers =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Loaded MONGO_URL =", process.env.MONGO_URL);

// ===== MongoDB =====
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// ===== HTTP Server =====
const server = http.createServer(app);

// ===== SOCKET.IO =====
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Attach io to app
app.set("io", io);

// Load socket handlers
require("./config/socket")(io);

// ===== Routes =====
app.use('/api/v1', require('./routes/menuRoutes'));
app.use('/api/v1', require('./routes/dishRoutes'));
app.use('/api/v1', require('./routes/orderRoutes'));

// ===== Start server =====
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
