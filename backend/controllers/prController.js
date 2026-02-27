import { GoogleGenerativeAI } from "@google/generative-ai";

export const generatePRDescription = async (req, res) => {
    const { prLink, problem, changes, testing, limitations, projectRequirements } = req.body;

    if (!prLink && (!problem || !changes)) {
        return res.status(400).json({ error: "Missing required fields (either prLink or both problem and changes)" });
    }

    const prompt = `
    You are an expert open-source maintainer and technical writer. I need you to generate a professional, clear, and structured Pull Request (PR) description in GitHub-flavored Markdown based on the following user input.

    User Input:
    ${prLink ? `- Related Issue/PR Link: ${prLink}` : ""}
    - What problem does this change solve? ${problem || "Refer to the provided link if available"}
    - What did you change? ${changes || "Refer to the provided link if available"}
    - How was this tested? ${testing || "Not specified"}
    - Are there any breaking changes or known limitations? ${limitations || "None"}

    Project PR Requirements/Guidelines:
    ${projectRequirements || "Follow standard professional open-source PR practices."}

    Task:
    Generate a structured PR description in Markdown. 
    Use the following sections (and add emojis for a modern feel):
    - ## 📌 Description
    - ## 🔗 Related Issue (${prLink ? `Relates to ${prLink}` : "placeholder like #issue-number"})
    - ## 🛠️ Type of Change (include options like Bug fix, New feature, etc. with [x] for the relevant one)
    - ## ✅ Checklist
    - ## 🧪 Testing Details
    - ## 📸 Screenshots (if applicable)
    - ## 💬 Additional Notes

    Make the tone professional yet welcoming. Ensure the Markdown is well-formatted.
  `;

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Default to a modern model if env var is missing or old
        const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const prDescription = response.text();

        res.json({ prDescription });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({
            error: "Failed to generate PR description. Please check your API key and try again. " + (error.message || "")
        });
    }
};

export const improveSectionText = async (req, res) => {
    const { text, fieldName, creativity, strictness } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({ error: "No text provided to improve." });
    }

    const fieldLabels = {
        prProblem: "Problem Statement",
        prChanges: "Changes Implemented",
        prTesting: "Testing Evidence",
        prLimitations: "Limitations / Notes",
    };

    const sectionName = fieldLabels[fieldName] || "PR section";

    // Map creativity level (0-100) to a tone instruction
    let creativityInstruction = "Use a balanced, clear tone.";
    if (creativity <= 20) {
        creativityInstruction = "Be extremely concise, minimal, and to the point. Use short bullet points.";
    } else if (creativity <= 40) {
        creativityInstruction = "Be concise and professional. Keep it brief but clear.";
    } else if (creativity <= 60) {
        creativityInstruction = "Use a balanced, clear, and professional tone.";
    } else if (creativity <= 80) {
        creativityInstruction = "Be expressive and detailed. Add context and helpful descriptions.";
    } else {
        creativityInstruction = "Be very expressive, detailed, and engaging. Use rich language and thorough descriptions.";
    }

    const strictnessInstruction = strictness === "best-practice"
        ? "Follow formal open-source best practices and coding standards language."
        : "Use a relaxed, developer-friendly, and approachable tone.";

    const prompt = `
    You are a technical writing assistant for open-source Pull Request descriptions.
    
    Improve the following "${sectionName}" text. Make it clearer, more professional, and better structured.
    
    Rules:
    - ${creativityInstruction}
    - ${strictnessInstruction}
    - Fix grammar, spelling, and readability issues.
    - Preserve the original meaning and technical details.
    - Do NOT add markdown headers — just return the improved text content.
    - Do NOT wrap your response in code blocks or quotes.
    - Return ONLY the improved text, nothing else.

    Original text:
    ${text}
    `;

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const improvedText = response.text().trim();

        res.json({ improvedText });
    } catch (error) {
        console.error("Gemini Improve Error:", error);
        res.status(500).json({
            error: "Failed to improve text. " + (error.message || "")
        });
    }
};
