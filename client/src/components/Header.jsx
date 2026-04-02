import { Link, useNavigate } from "react-router-dom";

function Header({ searchTerm, setSearchTerm, toggleSidebar }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header style={headerStyle}>
      {/* Left */}
      <div style={leftStyle}>
        <button style={menuButtonStyle} onClick={toggleSidebar}>
          ☰
        </button>

        <Link to="/" style={logoStyle}>
          YouTube Clone
        </Link>
      </div>

      {/* Center Search */}
      <div style={centerStyle}>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm || ""}
          onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {/* Right */}
      <div style={rightStyle}>
        {username ? (
          <>
            <span style={userStyle}>Hi, {username}</span>
            <Link to="/channel" style={channelButtonStyle}>
              My Channel
            </Link>
            <button onClick={handleLogout} style={logoutButtonStyle}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={loginButtonStyle}>
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 20px",
  backgroundColor: "#0f0f0f",
  color: "white",
  borderBottom: "1px solid #222",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 1000,
  height: "64px",
};

const leftStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const centerStyle = {
  flex: 2,
  display: "flex",
  justifyContent: "center",
};

const rightStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "10px",
};

const menuButtonStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "24px",
  cursor: "pointer",
};

const logoStyle = {
  color: "#ff0000",
  textDecoration: "none",
  fontSize: "22px",
  fontWeight: "bold",
};

const searchInputStyle = {
  width: "100%",
  maxWidth: "500px",
  padding: "10px 14px",
  borderRadius: "20px",
  border: "1px solid #444",
  backgroundColor: "#121212",
  color: "white",
  outline: "none",
};

const userStyle = {
  fontSize: "14px",
  color: "#ddd",
};

const loginButtonStyle = {
  padding: "8px 14px",
  borderRadius: "20px",
  border: "none",
  backgroundColor: "#3ea6ff",
  color: "black",
  textDecoration: "none",
  fontWeight: "bold",
};

const channelButtonStyle = {
  padding: "8px 14px",
  borderRadius: "20px",
  border: "none",
  backgroundColor: "#272727",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

const logoutButtonStyle = {
  padding: "8px 14px",
  borderRadius: "20px",
  border: "none",
  backgroundColor: "#ff4c4c",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Header;