import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import Program from "../models/Program.js";
import Project from "../models/Project.js";
import connectDB from "../config/db.js";

// ESM fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const validDifficulties = ["Beginner", "Intermediate", "Advanced"];
function normalizeDifficulty(diff) {
    if (!diff) return "Beginner";
    // Handle "Beginner -> Intermediate" etc
    if (diff.includes("Beginner")) return "Beginner";
    if (diff.includes("Advanced")) return "Advanced";
    return "Intermediate";
}
// Connect DB
await connectDB();

const importData = async () => {
    try {
        // Read programs.json
        // Determine path relative to backend/scripts
        const programsPath = path.resolve(__dirname, "../../frontend/data/programs.json");

        if (!fs.existsSync(programsPath)) {
            console.error(`File not found at ${programsPath}`);
            process.exit(1);
        }

        const programsData = JSON.parse(fs.readFileSync(programsPath, "utf-8"));

        // Clear existing data
        await Program.deleteMany();
        await Project.deleteMany();

        console.log("Old Data Destroyed...");

        // Transform and Insert Programs
        const programsToInsert = programsData.map(p => ({
            name: p.name,
            description: p.description,
            url: p.url,
            image: p.image,
            status: p.status,
            difficulty: normalizeDifficulty(p.difficulty),
            timeline: p.timeline,
            stipend: p.stipend,
        }));

        const createdPrograms = await Program.insertMany(programsToInsert);
        const gsoc = createdPrograms.find(p => p.name.includes("Google Summer of Code"));
        const hacktoberfest = createdPrograms.find(p => p.name.includes("Hacktoberfest"));
        const mlh = createdPrograms.find(p => p.name.includes("MLH"));
        const ssoc = createdPrograms.find(p => p.name.includes("Social Summer of Code"));

        // Sample Projects
        const projects = [];

        await Project.insertMany(projects);

        console.log("Data Imported Successfully!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
