import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  addComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Add Comment
router.post("/", protect, addComment);

// Get Comments By Video ID
router.get("/:videoId", getCommentsByVideo);

// Update Comment
router.put("/:id", protect, updateComment);

// Delete Comment
router.delete("/:id", protect, deleteComment);

export default router;