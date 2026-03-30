import Channel from "../models/Channel.js";
import User from "../models/User.js";

// @desc    Create Channel
// @route   POST /api/channels
// @access  Private
export const createChannel = async (req, res) => {
  try {
    const { channelName, description, channelBanner } = req.body;

    if (!channelName) {
      return res.status(400).json({ message: "Channel name is required" });
    }

    // Check if user already has a channel
    const existingUserChannel = await Channel.findOne({ owner: req.user._id });
    if (existingUserChannel) {
      return res.status(400).json({ message: "You already have a channel" });
    }

    // Check if channel name already exists
    const existingChannelName = await Channel.findOne({ channelName });
    if (existingChannelName) {
      return res.status(400).json({ message: "Channel name already taken" });
    }

    // Create channel
    const channel = await Channel.create({
      channelName,
      owner: req.user._id,
      description,
      channelBanner,
    });

    // Save channel id in user
    await User.findByIdAndUpdate(req.user._id, {
      channel: channel._id,
    });

    return res.status(201).json({
      message: "Channel created successfully",
      channel,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get Channel By ID
// @route   GET /api/channels/:id
// @access  Public
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate(
      "owner",
      "username email avatar"
    );

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    return res.status(200).json(channel);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get Channel By User ID
// @route   GET /api/channels/user/:userId
// @access  Public
export const getChannelByUserId = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.params.userId }).populate(
      "owner",
      "username email avatar"
    );

    if (!channel) {
      return res.status(404).json({ message: "Channel not found for this user" });
    }

    return res.status(200).json(channel);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};