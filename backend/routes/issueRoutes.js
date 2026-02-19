import express from "express";
import { analyzeIssue, validateIssue } from "../controllers/issueController.js";

const router = express.Router();

router.post("/analyze", analyzeIssue);
router.post("/validate", validateIssue);

export default router;
