import express from "express";
import { generatePRDescription } from "../controllers/prController.js";

const router = express.Router();

router.post("/generate-pr", generatePRDescription);

export default router;
