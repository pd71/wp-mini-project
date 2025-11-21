import express from "express";
import { recommendSongs } from "../controllers/recommendController.js";

const router = express.Router();

// POST /api/music/recommend
router.post("/recommend", recommendSongs);

export default router;
