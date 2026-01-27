import Project from "../models/Project.js";
import Program from "../models/Program.js";

// @desc    Get recommended projects
// @route   GET /api/projects/recommend
// @access  Public
export const getRecommendations = async (req, res) => {
    try {
        const { skills, difficulty, programs } = req.query;

        let query = {};

        // Filter by Difficulty
        if (difficulty) {
            if (difficulty === "Beginner") {
                query.difficulty = "Beginner";
            } else if (difficulty === "Intermediate") {
                query.difficulty = { $in: ["Beginner", "Intermediate"] };
            }
            // If Advanced, show all (no filter needed on difficulty ideally, or show all valid ones)
        }

        // Filter by Program
        if (programs) {
            const programNames = programs.split(",").map(p => p.trim());
            // Find IDs for these programs
            const programDocs = await Program.find({ name: { $in: programNames } });
            const programIds = programDocs.map(p => p._id);

            if (programIds.length > 0) {
                query.programId = { $in: programIds };
            } else {
                // If programs provided but none found, return empty or ignore? 
                // Logic: if specific programs asked, match ONLY them.
                query.programId = { $in: [] }; // Force empty result
            }
        }

        let projects = await Project.find(query).populate("programId", "name status");

        // Score and Rank
        if (skills) {
            const userSkills = skills.split(",").map(s => s.trim().toLowerCase());

            projects = projects.map(p => {
                const pObj = p.toObject();
                let score = 0;

                // Skill Match
                const techStack = p.techStack || [];
                const matches = techStack.filter(t => userSkills.includes(t.toLowerCase()));
                score += matches.length * 10;

                // Bonus for "Good First Issue"
                if (p.goodFirstIssueCount > 0) score += 5;

                // Bonus for "Active" program
                if (p.programId && p.programId.status === "Active") score += 5;

                // Bonus for exact difficulty match
                if (difficulty && p.difficulty === difficulty) score += 3;

                pObj.score = score;
                pObj.matchCount = matches.length;
                return pObj;
            });

            // Sort DESC by score
            projects.sort((a, b) => b.score - a.score);
        }

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate("programId");
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
