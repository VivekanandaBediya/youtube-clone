function VideoCard({ video }) {
  return (
    <div style={styles.card}>
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        style={styles.thumbnail}
      />

      <div style={styles.info}>
        <h3 style={styles.title}>{video.title}</h3>
        <p style={styles.channel}>{video.channelName}</p>
        <p style={styles.views}>{video.views} views</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "100%",
    cursor: "pointer",
  },
  thumbnail: {
    width: "100%",
    borderRadius: "12px",
    objectFit: "cover",
  },
  info: {
    paddingTop: "10px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "white",
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