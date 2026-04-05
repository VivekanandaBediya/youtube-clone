function Sidebar({ isOpen }) {
  return (
    <aside style={{...styles.sidebar,transform: isOpen ? "translateX(0)" : "translateX(-100%)",}}>
      <div style={styles.item}>🏠 Home</div>
      <div style={styles.item}>🎬 Shorts</div>
      <div style={styles.item}>📺 Subscriptions</div>
      <div style={styles.item}>📚 Library</div>
      <div style={styles.item}>🕒 History</div>
    </aside>
  );
}


// CSS styling section 
const styles = {
  sidebar: {
    width: "220px",
    height: "calc(100vh - 64px)",
    backgroundColor: "#0f0f0f",
    color: "white",
    borderRight: "1px solid #303030",
    padding: "20px 10px",
    position: "fixed",
    top: "64px",
    left: 0,
    transition: "transform 0.3s ease",
    zIndex: 999,
    overflowY: "auto",
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