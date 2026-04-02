import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/video/${video._id}`)}
    >
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        style={styles.thumbnail}
      />

      <div style={styles.info}>
        <h3 style={styles.title}>{video.title}</h3>
        <p style={styles.channel}>{video.channelName}</p>
        <p style={styles.views}>{video.views.toLocaleString()} views</p>
      </div>
    </div>
  );
}

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