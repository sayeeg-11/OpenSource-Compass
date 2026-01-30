import express from "express";
import { getRecommendations, getProjects } from "../controllers/projectController.js";

const router = express.Router();

router.get("/recommend", getRecommendations);
router.get("/", getProjects);

export default router;
