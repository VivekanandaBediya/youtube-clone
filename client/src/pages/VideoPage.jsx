import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import videos from "../data/videos";

function VideoPage() {
  const { id } = useParams(); // /video/:id
  const [video, setVideo] = useState(null);
  const [commentText, setCommentText] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const selectedVideo = videos.find((v) => v.videoId === id);
    setVideo(selectedVideo || null);
  }, [id]);

  const handleLike = () => {
    setVideo((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
  };

  const handleDislike = () => {
    setVideo((prev) => ({ ...prev, dislikes: (prev.dislikes || 0) + 1 }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: username || "Guest",
      text: commentText,
    };

    setVideo((prev) => ({
      ...prev,
      comments: [...(prev.comments || []), newComment],
    }));

    setCommentText("");
  };

  const handleDeleteComment = (commentId) => {
    setVideo((prev) => ({
      ...prev,
      comments: (prev.comments || []).filter((c) => c.id !== commentId),
    }));
  };

  if (!video) {
    return (
      <p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Video not found
      </p>
    );
  }

  return (
    <div style={{ backgroundColor: "#0f0f0f", minHeight: "100vh", color: "white" }}>
      <Header />

      <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
        <video
          src={video.videoUrl}
          controls
          style={{ width: "100%", borderRadius: "8px" }}
        />

        <h2 style={{ marginTop: "20px" }}>{video.title}</h2>
        <p>{video.description}</p>

        <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
          <p>👀 {video.views || 0} views</p>
          <p>📂 {video.category}</p>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button onClick={handleLike} style={buttonStyle}>
            👍 {video.likes || 0}
          </button>
          <button onClick={handleDislike} style={buttonStyle}>
            👎 {video.dislikes || 0}
          </button>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h3>Comments</h3>

          <form
            onSubmit={handleAddComment}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <textarea
              placeholder="Add a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ ...inputStyle, height: "60px" }}
            />
            <button type="submit" style={buttonStyle}>
              Add Comment
            </button>
          </form>

          {(video.comments || []).length === 0 && <p>No comments yet.</p>}

          {(video.comments || []).map((comment) => (
            <div
              key={comment.id}
              style={{
                backgroundColor: "#1f1f1f",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
            >
              <strong>{comment.user}:</strong> {comment.text}
              {comment.user === username && (
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
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