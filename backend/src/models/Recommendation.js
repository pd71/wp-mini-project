import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema(
  {
    mood: {
      type: String,
      required: true,
    },
    songs: [
      {
        title: { type: String, required: true },
        artist: { type: String, required: true },
        reason: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);
export default Recommendation;
