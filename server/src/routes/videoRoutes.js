import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createVideo,
  getAllVideos,
  getVideoById,
  getVideosByChannel,
  updateVideo,
  deleteVideo,
  likeVideo,
  dislikeVideo,
} from "../controllers/videoController.js";

const router = express.Router();

// Create Video
router.post("/", protect, createVideo);

// Get All Videos (Search + Filter)
router.get("/", getAllVideos);

// Get Videos By Channel
router.get("/channel/:channelId", getVideosByChannel);

// Get Single Video
router.get("/:id", getVideoById);

// Update Video
router.put("/:id", protect, updateVideo);

// Delete Video
router.delete("/:id", protect, deleteVideo);

// Like Video
router.put("/:id/like", protect, likeVideo);

// Dislike Video
router.put("/:id/dislike", protect, dislikeVideo);

export default router;