const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

// Test route to check authentication
router.get(
  "/auth-test",
  (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log("🔐 Auth Test - Token:", token ? "Present" : "Missing");

    if (token) {
      const jwt = require("jsonwebtoken");
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token valid - User:", decoded);
        req.user = decoded;
      } catch (err) {
        console.log("❌ Token invalid:", err.message);
        req.user = null;
      }
    } else {
      req.user = null;
    }

    next();
  },
  (req, res) => {
    res.json({
      message: "Auth test completed",
      user: req.user,
      token_present: !!req.header("Authorization"),
    });
  }
);

module.exports = router;
