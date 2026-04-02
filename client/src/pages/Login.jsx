import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authapi";
import { useAuth } from "../context/authContext";

function Login() {
  const navigate = useNavigate();
  const { login }  = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(formData);

      // Expected backend response:
      // { token, user: { username, email, _id } }

      const { token, user } = res.data;

      localStorage.setItem("token", token);

      login(user); // save in AuthContext

      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>YouTube Clone</h1>
        <h2 style={styles.heading}>Sign In</h2>
        <p style={styles.subText}>Welcome back! Please login to continue.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0f0f0f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#181818",
    padding: "40px 30px",
    borderRadius: "18px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
    textAlign: "center",
    color: "white",
  },
  logo: {
    color: "#ff0000",
    fontSize: "30px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "8px",
  },
  subText: {
    color: "#aaa",
    marginBottom: "28px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #333",
    backgroundColor: "#121212",
    color: "white",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#ff0000",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "6px",
  },
  error: {
    color: "#ff6b6b",
    fontSize: "14px",
    textAlign: "left",
    marginTop: "-6px",
  },
  footerText: {
    marginTop: "22px",
    fontSize: "14px",
    color: "#bbb",
  },
  link: {
    color: "#3ea6ff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;