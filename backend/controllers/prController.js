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
