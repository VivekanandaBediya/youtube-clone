function Header({ searchTerm, setSearchTerm }) {
  return (
    <header style={styles.header}>
      {/* Left */}
      <div style={styles.leftSection}>
        <button style={styles.menuBtn}>☰</button>
        <h2 style={styles.logo}>YouTube</h2>
      </div>

      {/* Center */}
      <div style={styles.centerSection}>
        <input
          type="text"
          placeholder="Search"
          style={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button style={styles.searchBtn}>🔍</button>
      </div>

      {/* Right */}
      <div style={styles.rightSection}>
        <button style={styles.signInBtn}>Sign In</button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: "60px",
    backgroundColor: "#0f0f0f",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    borderBottom: "1px solid #303030",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  menuBtn: {
    background: "transparent",
    color: "white",
    fontSize: "24px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "red",
  },
  centerSection: {
    display: "flex",
    alignItems: "center",
    width: "40%",
  },
  searchInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px 0 0 20px",
    border: "1px solid #303030",
    backgroundColor: "#121212",
    color: "white",
    outline: "none",
  },
  searchBtn: {
    padding: "10px 16px",
    borderRadius: "0 20px 20px 0",
    backgroundColor: "#222",
    color: "white",
    border: "1px solid #303030",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
  },
  signInBtn: {
    padding: "8px 16px",
    borderRadius: "20px",
    backgroundColor: "#3ea6ff",
    color: "black",
    fontWeight: "bold",
  },
};

export default Header;