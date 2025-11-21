import RequestedMood from "../models/RequestedMood.js";

export const recommendSongs = async (req, res) => {
  try {
    const { mood } = req.body;

    if (!mood || !mood.trim()) {
      return res.status(400).json({ message: "Mood is required." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: "Gemini API key not found." });
    }

    const modelName = "gemini-2.5-flash-lite";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const prompt = `
Provide exactly 5 songs for someone saying they are: "${mood}".
Respond ONLY with a strictly valid JSON array of 5 objects.
Each object must have: "title", "artist", "reason".
No extra text. Do not include any explanations, text, or Markdown. Output must be valid JSON only.
    `;

    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 300,
      },
    };

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // attempt to parse Google response body (may be an error object)
    let data = null;
    try {
      data = await r.json();
    } catch (e) {
      // non-json body or empty
      data = null;
    }

    // If Google returned a non-OK status, forward debug info to client
    if (!r.ok) {
      return res.status(r.status).json({
        message: "Google API error",
        googleStatus: r.status,
        googleBody: data,
      });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    let jsonOutput;
    try {
      jsonOutput = JSON.parse(text);
    } catch (err) {
      const start = text.indexOf("[");
      const end = text.lastIndexOf("]");
      if (start !== -1 && end !== -1) {
        try {
          jsonOutput = JSON.parse(text.slice(start, end + 1));
        } catch (e) {
          jsonOutput = null;
        }
      }
    }

    // Save raw response to DB
    await RequestedMood.create({ mood, result: text });

    if (!jsonOutput) return res.status(200).json({ raw: text });

    return res.status(200).json(jsonOutput);
  } catch (error) {
    console.error("Recommendation Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
