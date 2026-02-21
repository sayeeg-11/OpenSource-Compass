// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   logoutUser,
//   getUserProfile,
// } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout", logoutUser);
// router.get("/profile", protect, getUserProfile); // Protected route

// export default router;
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  trackGuideCompletion,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getUserProfile);

// GitHub OAuth Routes
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // Generate JWT for the user authenticated via GitHub
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Redirect to frontend dashboard or home
    res.redirect(`${process.env.FRONTEND_URL || "http://localhost:5500"}/frontend/pages/dashboard.html`);
  }
);

// Progress Tracking Route
router.post("/track-guide", protect, trackGuideCompletion);

export default router;
