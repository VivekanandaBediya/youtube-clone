import { useState, useEffect } from "react";
import Header from "../components/Header";

function ChannelPage() {
  const username = localStorage.getItem("username");
  const [channelName, setChannelName] = useState(username ? username + "'s Channel" : "");
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");

  useEffect(() => {
    // Load videos from localStorage if available
    const savedVideos = JSON.parse(localStorage.getItem("videos")) || [];
    setVideos(savedVideos);
  }, []);

  const saveVideosToStorage = (updatedVideos) => {
    localStorage.setItem("videos", JSON.stringify(updatedVideos));
    setVideos(updatedVideos);
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!newVideoTitle || !newVideoUrl) return alert("Enter video title and URL!");
    const newVideo = {
      id: Date.now(),
      title: newVideoTitle,
      videoUrl: newVideoUrl,
      thumbnail: newThumbnail || "https://via.placeholder.com/150",
      description,
      likes: 0,
      dislikes: 0,
      comments: [],
    };
    const updatedVideos = [...videos, newVideo];
    saveVideosToStorage(updatedVideos);
    setNewVideoTitle("");
    setNewVideoUrl("");
    setNewThumbnail("");
    setDescription("");
  };

  const handleDeleteVideo = (id) => {
    const updatedVideos = videos.filter((v) => v.id !== id);
    saveVideosToStorage(updatedVideos);
  };

  return (
    <div style={{ backgroundColor: "#0f0f0f", minHeight: "100vh", color: "white" }}>
      <Header />
      <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px" }}>
        <h2>{channelName}</h2>
        <form onSubmit={handleAddVideo} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Video Title"
            value={newVideoTitle}
            onChange={(e) => setNewVideoTitle(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Video URL"
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Thumbnail URL (optional)"
            value={newThumbnail}
            onChange={(e) => setNewThumbnail(e.target.value)}
            style={inputStyle}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, height: "60px" }}
          />
          <button type="submit" style={buttonStyle}>Add Video</button>
        </form>

        <h3>Uploaded Videos:</h3>
        {videos.length === 0 && <p>No videos uploaded yet.</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {videos.map((video) => (
            <div key={video.id} style={{ width: "200px", backgroundColor: "#1f1f1f", padding: "10px", borderRadius: "8px" }}>
              <img src={video.thumbnail} alt={video.title} style={{ width: "100%", borderRadius: "4px" }} />
              <h4>{video.title}</h4>
              <p style={{ fontSize: "12px" }}>{video.description}</p>
              <button onClick={() => handleDeleteVideo(video.id)} style={deleteButtonStyle}>Delete</button>
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
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#3ea6ff",
  color: "black",
  cursor: "pointer",
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ff4c4c",
  marginTop: "5px",
  width: "100%",
};

export default ChannelPage;