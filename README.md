<h1 align="center">🎧 moodtune — Mood-based Song Recommender</h1>

This project is a lightweight MERN frontend + Express backend that recommends 5 songs based on a user's mood (text input). The backend calls a Generative Language model (Gemini) — set `GEMINI_API_KEY` and `GEMINI_MODEL` in the backend `.env` to configure.

---

## 🧪 .env Setup

### Backend (`/backend`)

```
MONGO_URI=<your_mongo_uri>

UPSTASH_REDIS_REST_URL=<your_redis_rest_url>
UPSTASH_REDIS_REST_TOKEN=<your_redis_rest_token>

NODE_ENV=development
```

## 🔧 Run the Backend

```
cd backend
npm install
npm run dev
```

## 💻 Run the Frontend

```
cd frontend
npm install
npm run dev
```
