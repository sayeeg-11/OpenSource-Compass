import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const parseGitHubUrl = (url) => {
    try {
        const urlObj = new URL(url);
        // Remove .git extension if present
        const pathname = urlObj.pathname.replace(/\.git$/, '');
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length >= 2) {
            return { owner: parts[0], repo: parts[1] };
        }
    } catch (e) {
        return null;
    }
    return null;
};

export const validateIssue = async (req, res) => {
    const { repoLink, title, description } = req.body;

    if (!repoLink || !title || !description) {
        return res.status(400).json({ error: "Missing required fields: repoLink, title, or description" });
    }

    const repoDetails = parseGitHubUrl(repoLink);
    if (!repoDetails) {
        return res.status(400).json({ error: "Invalid GitHub Repository Link. Format should be https://github.com/owner/repo" });
    }

    let existingIssuesSummary = "Could not fetch existing issues.";
    let projectContext = "Could not fetch project files.";

    try {
        const issuesUrl = `https://api.github.com/repos/${repoDetails.owner}/${repoDetails.repo}/issues?state=all&per_page=100`;
        const treeUrl = `https://api.github.com/repos/${repoDetails.owner}/${repoDetails.repo}/git/trees/main?recursive=1`; // Try main first

        // Parallel fetch for speed
        const [issuesRes, treeRes] = await Promise.allSettled([
            axios.get(issuesUrl, { headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'OpenSource-Compass-Tool' } }),
            axios.get(treeUrl, { headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'OpenSource-Compass-Tool' } })
        ]);

        if (issuesRes.status === 'fulfilled') {
            existingIssuesSummary = issuesRes.value.data.map(issue =>
                `- #${issue.number} [${issue.state}] (Created: ${issue.created_at.split('T')[0]}) ${issue.title}\n  Snippet: ${issue.body ? issue.body.substring(0, 200).replace(/\n/g, ' ') : 'No description'}...`
            ).join("\n");
        } else {
            existingIssuesSummary = "Error fetching issues: " + issuesRes.reason.message;
        }

        if (treeRes.status === 'fulfilled') {
            // Limit to top 50 files for context window
            projectContext = treeRes.value.data.tree
                .filter(item => item.type === 'blob')
                .slice(0, 100)
                .map(item => item.path)
                .join("\n");
        } else {
            try {
                const fallbackTree = await axios.get(`https://api.github.com/repos/${repoDetails.owner}/${repoDetails.repo}/git/trees/master?recursive=1`, {
                    headers: { 'User-Agent': 'OpenSource-Compass-Tool' }
                });
                projectContext = fallbackTree.data.tree
                    .filter(item => item.type === 'blob')
                    .slice(0, 100)
                    .map(item => item.path)
                    .join("\n");
            } catch (e) {
                projectContext = "Could not fetch file tree (repo might be empty or too large/private).";
            }
        }

    } catch (error) {
        console.error(`GitHub API Error for ${repoDetails.owner}/${repoDetails.repo}:`, error.message);
    }

    const prompt = `
    You are a **Friendly Open Source Mentor and Guide**.
    
    **Goal:** Help the user (who might be a beginner) check if their issue is unique. Your tone should be encouraging, clear, and easy to understand.
    
    **Input Details:**
    1. **Repository:** ${repoLink}
    2. **Proposed Title:** ${title}
    3. **Proposed Description:** ${description}
    
    **Project Context (Files):**
    ${projectContext}

    **Existing Issues (Open & Closed):**
    ${existingIssuesSummary}
    
    **Analysis Required:**
    1. **Uniqueness Check:** 
       - Read the proposed issue and compare it with existing ones.
       - Is it unique? Is it a duplicate? Explain gently.
    
    2. **Related Issues:**
       - Find any similar or related issues so the user can learn from them.
       
    3. **Code Context:**
       - Does the issue mention existing files?

    **Output Format:**
    Return a JSON object (WITHOUT Markdown) with this structure:
    {
        "status": "Unique" | "Duplicate" | "Potential Duplicate",
        "headline": "Issue Validation Report",
        "uniqueness_feedback": "Write a friendly, paragraph-style explanation. Use <b>bold</b> for important terms. If the issue is unique, say something encouraging! If it's a duplicate, explain clearly why.",
        "related_issues": [
            { "number": 123, "title": "Example Issue", "status": "open|closed", "date": "YYYY-MM-DD", "relevance": "Exact Duplicate" | "Related" }
        ],
        "project_context_feedback": "Simple, non-technical check. Use <b>bold</b> for file names found."
    }
    `;

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Default to gemini-2.5-flash per user request
        const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean up markdown code blocks if Gemini adds them
        const cleanedResponse = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        const validationResult = JSON.parse(cleanedResponse);

        res.json(validationResult);

    } catch (error) {
        console.error("Gemini/Validation Error:", error);
        res.status(500).json({
            error: "Failed to validate issue. Please try again. " + (error.message || "")
        });
    }
};
