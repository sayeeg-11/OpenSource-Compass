
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
dotenv.config();




// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Send Welcome Email
  await sendEmail({
    to: email,
    subject: "Welcome to AlgoAI 🚀",
    html: `
      <h2>Hello ${name} 👋</h2>
      <p>Welcome to <b>AlgoAI</b>.</p>
      <p>You can now start using AI tools.</p>
      <br/>
      <p>— Team AlgoAI</p>
    `,
  });

  res.status(201).json({
    success: true,
    message: "User registered & email sent",
  });
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.json({ success: true, message: "Logged out successfully" });
};


export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json({ success: true, user });
};
