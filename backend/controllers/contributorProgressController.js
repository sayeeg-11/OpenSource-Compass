import User from "../models/User.js";

export const getContributorProgress = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("progress level");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let nextSteps = [];

    if (user.level === "Beginner") {
      nextSteps = [
        "Pick a beginner-friendly issue",
        "Open your first pull request",
        "Read the contribution guidelines",
      ];
    } else if (user.level === "Intermediate") {
      nextSteps = [
        "Work on medium-level issues",
        "Improve PR quality",
        "Participate in code reviews",
      ];
    } else if (user.level === "Advanced") {
      nextSteps = [
        "Solve complex issues",
        "Mentor new contributors",
        "Help with project architecture",
      ];
    }

    return res.status(200).json({
      level: user.level,
      progress: user.progress,
      nextSteps,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

