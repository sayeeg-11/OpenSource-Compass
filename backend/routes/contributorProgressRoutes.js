import express from "express";
import { getContributorProgress } from "../controllers/contributorProgressController.js";

const router = express.Router();

router.get("/:userId", getContributorProgress);

export default router;

