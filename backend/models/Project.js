import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    repositoryUrl: { type: String, required: true, unique: true }, // GitHub URL
    programId: { type: mongoose.Schema.Types.ObjectId, ref: "Program" }, // Associated program
    techStack: [{ type: String }], // e.g., ["JavaScript", "React", "Python"]
    difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Intermediate" },
    mentorshipAvailable: { type: Boolean, default: false },

    // GitHub Metadata
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    openIssues: { type: Number, default: 0 },
    lastCommitDate: { type: Date },
    languages: [{ type: String }], // from GitHub languages API
    goodFirstIssueCount: { type: Number, default: 0 },

    lastUpdated: { type: Date, default: Date.now }
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
