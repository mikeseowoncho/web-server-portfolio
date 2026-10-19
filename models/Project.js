import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["current", "legacy"],
      default: "current",
    },
    week: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    repoUrl: {
      type: String,
      required: true,
    },
    deployUrl: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
