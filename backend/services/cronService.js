import cron from "node-cron";
import Project from "../models/Project.js";
import axios from "axios";
import { runIngestion } from "./ingestionService.js";

const setupCronJobs = () => {
    console.log("Initializing Cron Jobs...");

    // Weekly Ingestion (Sunday at 2 AM)
    cron.schedule('0 2 * * 0', async () => {
        console.log("Running Scheduled Project Ingestion...");
        await runIngestion();
    });

    // Daily Metadata Refresh (Midnight)
    cron.schedule('0 0 * * *', async () => {
        console.log("Running Daily GitHub Metadata Refresh...");
        try {
            const projects = await Project.find({});

            for (const project of projects) {
                if (!project.repositoryUrl) continue;

                // Extract owner/repo from URL
                // e.g., https://github.com/facebook/react -> facebook, react
                // Remove trailing slash if any
                const url = project.repositoryUrl.replace(/\/$/, "");
                const parts = url.split("/");
                if (parts.length < 5) continue;
                const owner = parts[parts.length - 2];
                const repo = parts[parts.length - 1];

                try {
                    // Warning: GitHub API has rate limits (60/hr unauth). 
                    // In production, use GITHUB_TOKEN.
                    const config = {};
                    if (process.env.GITHUB_TOKEN) {
                        config.headers = { Authorization: `token ${process.env.GITHUB_TOKEN}` };
                    }

                    const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, config);
                    const data = res.data;

                    project.stars = data.stargazers_count;
                    project.forks = data.forks_count;
                    project.openIssues = data.open_issues_count;
                    project.lastCommitDate = data.pushed_at;

                    // Add new languages
                    if (data.language && !project.languages.includes(data.language)) {
                        project.languages.push(data.language);
                    }
                    project.lastUpdated = new Date();
                    await project.save();
                    console.log(`Updated ${project.name}`);
                } catch (err) {
                    console.error(`Failed to update ${project.name}: ${err.message}`);
                }
            }
            console.log("Daily Refresh Complete.");
        } catch (e) {
            console.error("Cron Job Failed:", e);
        }
    });

    // Run once immediately on startup for demo purposes (optional)
    // setTimeout(runIngestion, 5000); 
};

export default setupCronJobs;
