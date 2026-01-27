import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contributorProgressRoutes from "./routes/contributorProgressRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import setupCronJobs from "./services/cronService.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contributor/progress", contributorProgressRoutes);
app.use("/api/projects", projectRoutes);

// Connect to MongoDB
connectDB();

// Setup Cron Jobs
setupCronJobs();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

