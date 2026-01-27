import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    image: { type: String }, // Path or URL
    status: { type: String, enum: ["Active", "Upcoming", "Completed", "Seasonal"], default: "Seasonal" },
    difficulty: { type: String }, // e.g., "Beginner", "Intermediate", "Advanced"
    timeline: { type: String },
    stipend: { type: String },
    lastUpdated: { type: Date, default: Date.now },
});

const Program = mongoose.model("Program", programSchema);
export default Program;
