import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contributorProgressRoutes from "./routes/contributorProgressRoutes.js";
import chatRoute from "./routes/chat.route.js";
import prRoutes from "./routes/prRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", chatRoute);
app.use("/api/pr", prRoutes);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contributor/progress", contributorProgressRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

