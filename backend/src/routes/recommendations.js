import express from "express";
import { recommendSongs } from "../controllers/recommendController.js";

const router = express.Router();

// POST /api/recommendations
router.post("/", recommendSongs);

export default router;
