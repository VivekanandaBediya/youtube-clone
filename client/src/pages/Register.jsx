import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authapi";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        username,
        email,
        password,
      };

      const res = await registerUser(payload);

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.logo}>YouTube Clone</h1>
        <h2 style={styles.heading}>Create Account</h2>
        <p style={styles.subText}>Join and start your video journey</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} style={styles.input}/>

          <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} style={styles.input}/>

          <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} style={styles.input}/>

          <input type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword}onChange={handleChange}style={styles.input}/>

          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}

          <button type="submit" style={styles.button} disabled={loading}> {loading ? "Creating Account..." : "Register"}</button>
        </form>

        <p style={styles.footerText}>Already have an account?{" "}<Link to="/login" style={styles.link}>Sign In</Link></p>
      </div>
    </div>
  );
}


// Stylling the Register page 
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
    maxWidth: "440px",
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
  success: {
    color: "#4ade80",
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

export default Register;