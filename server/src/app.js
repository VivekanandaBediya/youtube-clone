import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("YouTube Clone API is running...");
});

// Auth Routes
app.use("/api/auth", authRoutes);

export default app;