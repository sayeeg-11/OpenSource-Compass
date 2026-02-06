import express from "express";
import { validateIssue } from "../controllers/issueController.js";

const router = express.Router();

router.post("/validate", validateIssue);

export default router;
