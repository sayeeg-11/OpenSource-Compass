import express from "express";
import { analyzeIssue } from "../controllers/issueController.js";

const router = express.Router();

router.post("/analyze", analyzeIssue);

export default router;
