import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import connectDB from "../config/db.js";
import { runIngestion } from "../services/ingestionService.js";

// ESM fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const trigger = async () => {
    await connectDB();
    await runIngestion();
    console.log("Manual Ingestion Triggered. Process Complete.");
    process.exit();
}

trigger();
