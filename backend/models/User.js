import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    //  NEW FIELDS FOR CONTRIBUTOR PROGRESS
    progress: {
      issuesSelected: {
        type: Number,
        default: 0,
      },
      prsOpened: {
        type: Number,
        default: 0,
      },
      prsMerged: {
        type: Number,
        default: 0,
      },
      currentStage: {
        type: String,
        enum: ["NONE", "ISSUE_SELECTED", "PR_OPENED", "PR_MERGED"],
        default: "NONE",
      },
    },

    //  ONBOARDING LEVEL
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

