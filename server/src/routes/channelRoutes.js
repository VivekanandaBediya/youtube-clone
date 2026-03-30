import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createChannel,
  getChannelById,
  getChannelByUserId,
} from "../controllers/channelController.js";

const router = express.Router();

// Create Channel (Protected)
router.post("/", protect, createChannel);

// Get Channel By User ID
router.get("/user/:userId", getChannelByUserId);

// Get Channel By ID
router.get("/:id", getChannelById);

export default router;