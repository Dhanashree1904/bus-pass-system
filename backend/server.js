require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const fs = require("fs");
const https = require("https");

// Import routes
const authRoutes = require("./routes/auth");
const passRoutes = require("./routes/passes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/passes", passRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Bus Pass System API",
    version: "1.0.0",
    status: "Running",
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Use HTTPS in production
if (process.env.NODE_ENV === "production") {
  const options = {
    key: fs.readFileSync("./server.key"),
    cert: fs.readFileSync("./server.crt"),
  };
  https.createServer(options, app).listen(PORT, () => {
    console.log(`Server running on port ${PORT} (HTTPS)`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (HTTP)`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}