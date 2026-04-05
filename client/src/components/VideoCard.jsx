import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video.videoId}`); // ✅ local data ka stable route
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <img src={video.thumbnailUrl} alt={video.title} style={styles.thumbnail} onError={(e) => {
          e.target.src = "https://via.placeholder.com/320x180?text=No+Thumbnail";
        }}
      />

      <div style={styles.info}>
        <h3 style={styles.title}>{video.title}</h3>
        <p style={styles.channel}>{video.channelName || "Unknown Channel"}</p>
        <p style={styles.views}>{(video.views || 0).toLocaleString()} views</p>
      </div>
    </div>
  );
}


// Styling section 
const styles = {
  card: {
    width: "100%",
    cursor: "pointer",
    backgroundColor: "#181818",
    borderRadius: "14px",
    overflow: "hidden",
    transition: "transform 0.2s ease",
  },
  thumbnail: {
    width: "100%",
    height: "190px",
    objectFit: "cover",
    display: "block",
  },
  info: {
    padding: "12px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "white",
    lineHeight: "1.4",
  },
  channel: {
    fontSize: "14px",
    color: "#aaaaaa",
    marginBottom: "4px",
  },
  views: {
    fontSize: "13px",
    color: "#888",
  },
};

export default VideoCard;