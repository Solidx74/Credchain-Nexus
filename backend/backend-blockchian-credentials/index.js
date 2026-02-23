const express = require("express");
const cors = require("cors");
const db = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");
const credentialRoutes = require("./routes/credentials");
const studentRoutes = require("./routes/students");
const testRoutes = require("./routes/test");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/credentials", credentialRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/test", testRoutes);

// Test database connection
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS solution", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        error: "Database test failed",
        details: err.message,
      });
    }
    res.json({
      message: "Database connection successful!",
      solution: results[0].solution,
      timestamp: new Date().toISOString(),
    });
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Blockchain Credentials API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Blockchain Credentials API is running!",
    timestamp: new Date().toISOString(),
  });
});

// Simple 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.originalUrl} does not exist`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`📜 Credentials API: http://localhost:${PORT}/api/credentials`);
  console.log(`🧪 Test database: http://localhost:${PORT}/test-db`);
});
