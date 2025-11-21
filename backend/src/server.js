import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";   // CORRECT PATH
import songsRouter from "./routes/songs.js";
import recommendationsRouter from "./routes/recommendations.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/music", songsRouter);
app.use("/api/recommendations", recommendationsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
