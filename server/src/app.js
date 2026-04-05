import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// auth routes
app.use("/api/auth", authRoutes);

// video routes
app.use("/api/videos", videoRoutes);

export default app;