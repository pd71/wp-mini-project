import dotenv from "dotenv";

dotenv.config();

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("GEMINI_API_KEY not found in .env");
  process.exit(1);
}

const MODEL = "gemini-2.5-flash-lite";
const PROMPT = `You are a helpful assistant that recommends music. Provide exactly 5 song recommendations for a user feeling \"nostalgic and calm\". Respond with a JSON array containing 5 objects, each with the keys: \"title\", \"artist\", and \"reason\" (one short sentence explaining why that song fits the mood). Do not include any additional text or markup.`;

const variants = [
  {
    name: "v1 models:generateText",
    url: `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateText?key=${KEY}`,
    body: { prompt: { text: PROMPT }, temperature: 0.3, maxOutputTokens: 400 },
  },
  {
    name: "v1beta2 models:generateText",
    url: `https://generativelanguage.googleapis.com/v1beta2/models/${MODEL}:generateText?key=${KEY}`,
    body: { prompt: { text: PROMPT }, temperature: 0.3, maxOutputTokens: 400 },
  },
  {
    name: "v1 text:generate (model param)",
    url: `https://generativelanguage.googleapis.com/v1/models/text:generate?key=${KEY}`,
    body: { model: MODEL, prompt: { text: PROMPT }, temperature: 0.3, maxOutputTokens: 400 },
  },
  {
    name: "v1beta2 text:generate (model param)",
    url: `https://generativelanguage.googleapis.com/v1beta2/models/text:generate?key=${KEY}`,
    body: { model: MODEL, prompt: { text: PROMPT }, temperature: 0.3, maxOutputTokens: 400 },
  },
  {
    name: "v1 models:predict (vertex style)",
    url: `https://generativelanguage.googleapis.com/v1/models/${MODEL}:predict?key=${KEY}`,
    body: { instances: [{ content: PROMPT }] },
  },
  // Try a known public model (text-bison-001) to check general API access
  {
    name: "v1 text-bison generateText",
    url: `https://generativelanguage.googleapis.com/v1/models/text-bison-001:generateText?key=${KEY}`,
    body: { prompt: { text: PROMPT }, temperature: 0.2, maxOutputTokens: 200 },
  },
  {
    name: "v1 text:generate (text-bison model param)",
    url: `https://generativelanguage.googleapis.com/v1/models/text:generate?key=${KEY}`,
    body: { model: "text-bison-001", prompt: { text: PROMPT }, temperature: 0.2, maxOutputTokens: 200 },
  },
];

async function tryVariant(v) {
  try {
    const res = await fetch(v.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(v.body),
    });
    const text = await res.text();
    console.log(`\n--- ${v.name} ---`);
    console.log("url:", v.url.replace(KEY, "[REDACTED_KEY]"));
    console.log("status:", res.status);
    console.log("body:", text || "(empty)");
    return { name: v.name, status: res.status, body: text };
  } catch (err) {
    console.log(`\n--- ${v.name} ---`);
    console.log("error:", err?.message || err);
    if (err?.cause) console.log("cause:", err.cause);
    return { name: v.name, error: String(err) };
  }
}

async function main() {
  for (const v of variants) {
    // eslint-disable-next-line no-await-in-loop
    await tryVariant(v);
  }
}

main();
