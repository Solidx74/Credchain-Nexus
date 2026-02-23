const express = require("express");
const router = express.Router();
const credentialController = require("../controllers/credentialController");
const { auth, requireRole } = require("../middleware/auth");

// Protected routes
router.post(
  "/issue",
  auth,
  requireRole(["university"]),
  credentialController.issueCredential
);
router.get(
  "/student",
  auth,
  requireRole(["student"]),
  credentialController.getStudentCredentials
);
router.get(
  "/university",
  auth,
  requireRole(["university"]),
  credentialController.getUniversityCredentials
);
router.get(
  "/all",
  auth,
  requireRole(["university"]),
  credentialController.getAllCredentials
);

// Public route but with optional authentication
router.get(
  "/verify/:hash",
  (req, res, next) => {
    // Try to authenticate if token exists, but don't require it
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      const jwt = require("jsonwebtoken");
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user to request if token is valid
      } catch (err) {
        // Token is invalid, proceed without user
        req.user = null;
      }
    } else {
      req.user = null;
    }

    next();
  },
  credentialController.verifyCredential
);

module.exports = router;
