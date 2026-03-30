import Video from "../models/Video.js";

// @desc    Create Video
// @route   POST /api/videos
// @access  Private
export const createVideo = async (req, res) => {
  try {
    const { title, thumbnailUrl, videoUrl, description, category, channelId } =
      req.body;

    if (!title || !thumbnailUrl || !videoUrl || !category || !channelId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const video = await Video.create({
      title,
      thumbnailUrl,
      videoUrl,
      description,
      category,
      channelId,
      uploader: req.user._id,
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

// @desc    Get Single Video
// @route   GET /api/videos/:id
// @access  Public
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
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

// @desc    Update Video
// @route   PUT /api/videos/:id
// @access  Private
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check ownership
    if (video.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Video
// @route   DELETE /api/videos/:id
// @access  Private
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check ownership
    if (video.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await video.deleteOne();

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like Video
// @route   PUT /api/videos/:id/like
// @access  Private
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const userId = req.user._id;

    // Remove from dislikes
    video.dislikes = video.dislikes.filter(
      (id) => id.toString() !== userId.toString()
    );

    // Toggle like
    if (video.likes.includes(userId)) {
      video.likes = video.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      video.likes.push(userId);
    }

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Dislike Video
// @route   PUT /api/videos/:id/dislike
// @access  Private
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const userId = req.user._id;

    // Remove from likes
    video.likes = video.likes.filter(
      (id) => id.toString() !== userId.toString()
    );

    // Toggle dislike
    if (video.dislikes.includes(userId)) {
      video.dislikes = video.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      video.dislikes.push(userId);
    }

    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};