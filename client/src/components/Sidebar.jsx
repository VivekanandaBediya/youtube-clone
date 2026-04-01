function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.item}>🏠 Home</div>
      <div style={styles.item}>🎬 Shorts</div>
      <div style={styles.item}>📺 Subscriptions</div>
      <div style={styles.item}>📚 Library</div>
      <div style={styles.item}>🕒 History</div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "calc(100vh - 60px)",
    backgroundColor: "#0f0f0f",
    color: "white",
    borderRight: "1px solid #303030",
    padding: "20px 10px",
    position: "sticky",
    top: "60px",
  },
  item: {
    padding: "12px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "10px",
    fontSize: "16px",
  },
};

export default Sidebar;