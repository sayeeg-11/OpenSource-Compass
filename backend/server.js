import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import contributorProgressRoutes from "./routes/contributorProgressRoutes.js";
import chatRoute from "./routes/chat.route.js";
import prRoutes from "./routes/prRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import session from "express-session";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5500", "http://127.0.0.1:5500", "http://127.0.0.1:3000"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "opensource-compass-secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", chatRoute);
app.use("/api/pr", prRoutes);
app.use("/api/issue", issueRoutes);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contributor/progress", contributorProgressRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

