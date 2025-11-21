import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    mood: { type: String, required: true },
    result: { type: String }, // raw response stored
  },
  { timestamps: true }
);

export default mongoose.model("RequestedMood", moodSchema);
