import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

export const analyzeIssue = async (req, res) => {
    const { issueUrl } = req.body;

    if (!issueUrl) {
        return res.status(400).json({ error: "Missing required field: issueUrl" });
    }

    try {
        // Parse URL
        const regex = /github\.com\/([^/]+)\/([^/]+)\/(?:issues|pull)\/(\d+)/;
        const match = issueUrl.match(regex);

        if (!match) {
            return res.status(400).json({ error: "Invalid GitHub Issue or PR URL. Format: https://github.com/owner/repo/issues/123" });
        }

        const [_, owner, repo, number] = match;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues/${number}`;

        const githubResponse = await axios.get(apiUrl, {
            headers: {
                'User-Agent': 'OpenSource-Compass-App'
            }
        });

        const issueData = githubResponse.data;
        const { title, body, user, html_url, state, created_at } = issueData;

        // Call Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
        const model = genAI.getGenerativeModel({ model: modelName });

        const prompt = `
        You are an expert open-source mentor and senior developer. Your goal is to help a contributor understand and tackle the following GitHub issue/PR.

        **Issue Details:**
        - **Title:** ${title}
        - **Author:** ${user.login}
        - **Description/Context:**
        ${body ? body.substring(0, 5000) : "No description provided."}
        
        **Your Task:**
        Generate a structured "Contributor Insight" report in Markdown. Use the following sections with emojis:

        1.  **🚀 Summary**: A simple, beginner-friendly explanation of what the issue is about. Avoid complex jargon if possible, or explain it.
        2.  **📋 Suggested Steps to Start**: 3-5 actionable steps the contributor should take immediately (e.g., "Locate file X", "Run the tests using Y command", "Reproduce the bug by...").
        3.  **💡 Key Concepts**: Briefly explain 1-2 technical concepts or terms central to this issue (e.g., "Debouncing", "Race Condition", "API Endpoint").
        4.  **❓ Clarification Questions**: If the issue description is vague, suggest 1-2 polite questions the contributor could ask the maintainer to get clarity. If it's clear, you can skip this.
        
        **Tone:** Encouraging, clear, and professional. 
        **Disclaimer:** Remind the user that you are an AI assistant and they should verify details with the codebase.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysis = response.text();

        res.json({
            analysis,
            issueDetails: {
                title,
                url: html_url,
                author: user.login,
                state,
                created_at
            }
        });

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({
            error: "Failed to analyze issue. " + error.message
        });
    }
};
