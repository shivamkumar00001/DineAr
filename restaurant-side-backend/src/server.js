import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js"; // <-- change here

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI || !process.env.DB_NAME) {
  console.error("MONGO_URI or DB_NAME is missing in config.env");
  process.exit(1);
}

const MONGO_URL = `${process.env.MONGO_URI}/${process.env.DB_NAME}`;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
