import Video from "../models/Video.js";

// Helper: find by custom videoId
const findVideoByVideoId = async (videoId) => {
  return await Video.findOne({ videoId });
};

// @desc    Create Video
// @route   POST /api/videos
// @access  Private
export const createVideo = async (req, res) => {
  try {
    const { title, thumbnailUrl, videoUrl, description, category, channelId } = req.body;

    if (!title || !thumbnailUrl || !videoUrl || !category || !channelId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Auto-generate next videoId
    const lastVideo = await Video.findOne().sort({ createdAt: -1 });
    const nextVideoId = lastVideo ? String(Number(lastVideo.videoId || 0) + 1) : "1";

    const video = await Video.create({
      videoId: nextVideoId,
      title,
      thumbnailUrl,
      videoUrl,
      description,
      category,
      channelId,
      uploader: req.user._id,
      views: 0,
      likes: [],
      dislikes: [],
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get All Videos (Search + Filter)
// @route   GET /api/videos
// @access  Public
export const getAllVideos = async (req, res) => {
  try {
    const { search = "", category } = req.query;

    let query = {};

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category && category !== "All") {
      query.category = category;
    }

    const videos = await Video.find(query)
      .populate("channelId", "channelName")
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Single Video by custom videoId
// @route   GET /api/videos/:id
// @access  Public
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id })
      .populate("channelId", "channelName")
      .populate("uploader", "username avatar");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Increase views
    video.views += 1;
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Videos By Channel
// @route   GET /api/videos/channel/:channelId
// @access  Public
export const getVideosByChannel = async (req, res) => {
  try {
    const videos = await Video.find({ channelId: req.params.channelId }).sort({
      createdAt: -1,
    });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Video by custom videoId
// @route   PUT /api/videos/:id
// @access  Private
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check ownership
    if (video.uploader?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedVideo = await Video.findOneAndUpdate(
      { videoId: req.params.id },
      req.body,
      { new: true }
    );

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Video by custom videoId
// @route   DELETE /api/videos/:id
// @access  Private
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check ownership
    if (video.uploader?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await video.deleteOne();

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like Video by custom videoId
// @route   PUT /api/videos/:id/like
// @access  Private
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const userId = req.user._id.toString();

    // Remove from dislikes
    video.dislikes = video.dislikes.filter(
      (id) => id.toString() !== userId
    );

    // Toggle like
    const alreadyLiked = video.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      video.likes = video.likes.filter((id) => id.toString() !== userId);
    } else {
      video.likes.push(req.user._id);
    }

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Dislike Video by custom videoId
// @route   PUT /api/videos/:id/dislike
// @access  Private
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.id });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const userId = req.user._id.toString();

    // Remove from likes
    video.likes = video.likes.filter(
      (id) => id.toString() !== userId
    );

    // Toggle dislike
    const alreadyDisliked = video.dislikes.some((id) => id.toString() === userId);

    if (alreadyDisliked) {
      video.dislikes = video.dislikes.filter((id) => id.toString() !== userId);
    } else {
      video.dislikes.push(req.user._id);
    }

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};