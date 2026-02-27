import express from "express";
import { generatePRDescription, improveSectionText } from "../controllers/prController.js";

const router = express.Router();

router.post("/generate-pr", generatePRDescription);
router.post("/improve-section", improveSectionText);

export default router;
