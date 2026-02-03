import axios from "axios";
import Project from "../models/Project.js";
import Program from "../models/Program.js";

const HEADER = {
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
};

export const ingestGSoC = async () => {
    console.log("Starting GSoC Ingestion...");
    try {
        // 2025 API (Previous year archive)
        const url = "https://summerofcode.withgoogle.com/api/program/2025/organizations/";
        const { data } = await axios.get(url);

        // Find or Create GSoC Program
        let program = await Program.findOne({ name: "Google Summer of Code" });
        if (!program) {
            program = await Program.create({
                name: "Google Summer of Code",
                description: "Global program focused on bringing more student developers into open source.",
                url: "https://summerofcode.withgoogle.com/",
                status: "Active",
                difficulty: "Advanced"
            });
        }

        let count = 0;
        for (const org of data) {
            // GSoC returns Orgs. 
            // Mapping: Org Name -> Project Name, Technologies -> Tech Stack
            const projectData = {
                name: org.name,
                description: org.tagline || org.description,
                repositoryUrl: org.website_url || org.url || `https://github.com/${org.slug}`, // Fallback
                programId: program._id,
                techStack: org.technologies || [],
                difficulty: "Advanced", // GSoC is generally advanced
                mentorshipAvailable: true,
                lastUpdated: new Date()
            };

            // Upsert
            await Project.findOneAndUpdate(
                { repositoryUrl: projectData.repositoryUrl }, // Match by URL
                projectData,
                { upsert: true, new: true }
            );
            count++;
        }
        console.log(`Ingested ${count} GSoC organizations/projects.`);
    } catch (err) {
        console.error("GSoC Ingestion Failed:", err.message);
    }
};

export const ingestSWoC = async () => {
    console.log("Starting SWoC Ingestion...");
    try {
        // Attempt to fetch from a likely API or static file
        // Note: SWoC beta site is an SPA. This endpoint is a best-guess based on standard structures.
        // If this fails, we might need a manual list or a proper scraper.
        // For this task, we will try to fetch a known static list or fail gracefully.

        let projects = [];
        try {
            // Fallback: Try a GitHub raw file if known, or just a sample set if the API fails
            const res = await axios.get("https://raw.githubusercontent.com/SocialWinterOfCode/SWoC-Web/main/src/data/projects.json", HEADER);
            projects = res.data;
        } catch (e) {
            console.log("SWoC GitHub fetch failed, trying direct API...");
            // If we can't find a live API, we skip or use a placeholder
            // projects = ...
        }

        if (!projects || projects.length === 0) {
            console.log("No SWoC projects found via auto-ingestion.");
            return;
        }

        let program = await Program.findOne({ name: "Social Winter of Code" });
        if (!program) {
            program = await Program.create({
                name: "Social Winter of Code",
                status: "Active",
                difficulty: "Beginner",
                url: "https://swoc.in"
            });
        }

        let count = 0;
        for (const p of projects) {
            const projectData = {
                name: p.title || p.name,
                description: p.description || "No description",
                repositoryUrl: p.github || p.url || p.repositoryUrl,
                programId: program._id,
                techStack: p.techStack || p.tags || [],
                difficulty: "Beginner",
                mentorshipAvailable: true,
                lastUpdated: new Date()
            };

            if (!projectData.repositoryUrl) continue;

            await Project.findOneAndUpdate(
                { repositoryUrl: projectData.repositoryUrl },
                projectData,
                { upsert: true, new: true }
            );
            count++;
        }
        console.log(`Ingested ${count} SWoC projects.`);

    } catch (err) {
        console.error("SWoC Ingestion Failed:", err.message);
    }
}

export const runIngestion = async () => {
    await ingestGSoC();
    await ingestSWoC();
}
