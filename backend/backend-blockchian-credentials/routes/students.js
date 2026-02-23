// backend/routes/students.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth, requireRole } = require("../middleware/auth");

// University adds new student
router.post("/add", auth, requireRole(["university"]), (req, res) => {
  const { name, email } = req.body;
  const university_id = req.user.userId;

  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // Check if user already exists
  User.findByEmail(email, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Create student with default password
    const defaultPassword = "student123"; // In production, generate random password
    User.create(
      {
        name,
        email,
        password: defaultPassword,
        role: "student",
      },
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error creating student" });
        }

        res.status(201).json({
          message: "Student added successfully",
          student: {
            id: result.insertId,
            name,
            email,
            role: "student",
          },
        });
      }
    );
  });
});

// Get all students (for university)
router.get("/", auth, requireRole(["university"]), (req, res) => {
  const query =
    "SELECT id, name, email, created_at FROM users WHERE role = 'student' ORDER BY created_at DESC";

  require("../config/db").query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ students: results });
  });
});

module.exports = router;
