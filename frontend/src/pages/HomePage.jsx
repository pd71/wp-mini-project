import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood.trim()) return toast.error("Please enter your mood");

    setLoading(true);
    setRecommendations(null);
    try {
      const res = await api.post("/recommendations", { mood });
      setRecommendations(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto p-4 mt-6">
        <h1 className="text-2xl font-bold mb-4">Mood-based Song Recommendations</h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="How are you feeling? (e.g. nostalgic, energetic, sad)"
            className="flex-1 border rounded px-3 py-2"
          />
          <button className="bg-primary text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Thinking..." : "Get 5 Songs"}
          </button>
        </form>

        <div>
          {recommendations == null && (
            <div className="text-muted">Enter your mood and get 5 song recommendations.</div>
          )}

          {recommendations && Array.isArray(recommendations) && (
            <div className="grid gap-4">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="border rounded p-3">
                  <div className="font-semibold">{rec.title} — {rec.artist}</div>
                  <div className="text-sm text-muted">{rec.reason}</div>
                </div>
              ))}
            </div>
          )}

          {recommendations && !Array.isArray(recommendations) && (
            <pre className="whitespace-pre-wrap bg-gray-100 p-3 rounded">{JSON.stringify(recommendations, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
