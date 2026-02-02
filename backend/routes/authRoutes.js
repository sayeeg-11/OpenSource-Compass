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
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getUserProfile);

export default router;
