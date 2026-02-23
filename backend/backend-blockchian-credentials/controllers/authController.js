const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
  // User Registration
  register: (req, res) => {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        error: "All fields are required: name, email, password, role",
      });
    }

    // Check if user already exists
    User.findByEmail(email, (err, existingUser) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Create new user
      User.create({ name, email, password, role }, (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error creating user" });
        }

        res.status(201).json({
          message: "User registered successfully",
          userId: result.insertId,
        });
      });
    });
  },

  // User Login
  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // Find user by email
    User.findByEmail(email, (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: "Error checking password" });
        }

        if (!isMatch) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        res.json({
          message: "Login successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      });
    });
  },

  // Get current user profile
  getProfile: (req, res) => {
    const userId = req.user.userId;

    User.findById(userId, (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ user });
    });
  },
};

module.exports = authController;
