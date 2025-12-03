const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Loaded MONGO_URL =", process.env.MONGO_URL);

// MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Create HTTP server for socket.io
const server = http.createServer(app);

// Initialize socket.io
const io = new Server(server, {
  cors: { origin: "*" }
});

// Attach io to app for controllers
app.set("io", io);

// Load socket handler
require("./config/socket")(io);

// Routes
app.use('/api/v1', require('./routes/menuRoutes'));
app.use('/api/v1', require('./routes/dishRoutes'));
app.use('/api/v1', require('./routes/orderRoutes')); // <-- NEW

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
