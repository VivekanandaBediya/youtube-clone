import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function VideoPage() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    // Load videos from localStorage
    const videos = JSON.parse(localStorage.getItem("videos")) || [];
    const selectedVideo = videos.find((v) => v.id.toString() === videoId);
    setVideo(selectedVideo || null);
  }, [videoId]);

  const updateVideo = (updatedVideo) => {
    const videos = JSON.parse(localStorage.getItem("videos")) || [];
    const updatedVideos = videos.map((v) => (v.id === updatedVideo.id ? updatedVideo : v));
    localStorage.setItem("videos", JSON.stringify(updatedVideos));
    setVideo(updatedVideo);
  };

  const handleLike = () => {
    const updatedVideo = { ...video, likes: video.likes + 1 };
    updateVideo(updatedVideo);
  };

  const handleDislike = () => {
    const updatedVideo = { ...video, dislikes: video.dislikes + 1 };
    updateVideo(updatedVideo);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText) return;
    const newComment = {
      id: Date.now(),
      user: username || "Guest",
      text: commentText,
    };
    const updatedVideo = { ...video, comments: [...video.comments, newComment] };
    updateVideo(updatedVideo);
    setCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    const updatedVideo = { ...video, comments: video.comments.filter(c => c.id !== commentId) };
    updateVideo(updatedVideo);
  };

  if (!video) return <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Video not found</p>;

  return (
    <div style={{ backgroundColor: "#0f0f0f", minHeight: "100vh", color: "white" }}>
      <Header />
      <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px" }}>
        <video src={video.videoUrl} controls style={{ width: "100%", borderRadius: "8px" }} />
        <h2>{video.title}</h2>
        <p>{video.description}</p>
        <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          <button onClick={handleLike} style={buttonStyle}>👍 {video.likes}</button>
          <button onClick={handleDislike} style={buttonStyle}>👎 {video.dislikes}</button>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h3>Comments</h3>
          <form onSubmit={handleAddComment} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            <textarea
              placeholder="Add a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ ...inputStyle, height: "60px" }}
            />
            <button type="submit" style={buttonStyle}>Add Comment</button>
          </form>

          {video.comments.length === 0 && <p>No comments yet.</p>}
          {video.comments.map((comment) => (
            <div key={comment.id} style={{ backgroundColor: "#1f1f1f", padding: "10px", borderRadius: "6px", marginBottom: "10px" }}>
              <strong>{comment.user}:</strong> {comment.text}
              {comment.user === username && (
                <button onClick={() => handleDeleteComment(comment.id)} style={deleteButtonStyle}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #444",
  backgroundColor: "#121212",
  color: "white",
};

const buttonStyle = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#3ea6ff",
  color: "black",
  cursor: "pointer",
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ff4c4c",
  marginLeft: "10px",
  fontSize: "12px",
};

export default VideoPage;