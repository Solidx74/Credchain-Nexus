const Credential = require("../models/Credential");
const Verification = require("../models/Verification");
const User = require("../models/User");

const credentialController = {
  // Issue new credential (University only)
  issueCredential: (req, res) => {
    if (req.user.role !== "university") {
      return res
        .status(403)
        .json({ error: "Only universities can issue credentials" });
    }

    const { student_id, title, description, issue_date } = req.body;
    const university_id = req.user.userId;

    // Validation
    if (!student_id || !title || !issue_date) {
      return res.status(400).json({
        error: "Student ID, title, and issue date are required",
      });
    }

    Credential.create(
      { student_id, university_id, title, description, issue_date },
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error issuing credential" });
        }

        res.status(201).json({
          message: "Credential issued successfully",
          credential: {
            id: result.id,
            blockchain_hash: result.blockchain_hash,
          },
        });
      }
    );
  },

  // Get student's own credentials
  getStudentCredentials: (req, res) => {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Access denied" });
    }

    const student_id = req.user.userId;

    Credential.findByStudentId(student_id, (err, credentials) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching credentials" });
      }

      res.json({ credentials });
    });
  },

  // Get university's issued credentials
  getUniversityCredentials: (req, res) => {
    if (req.user.role !== "university") {
      return res.status(403).json({ error: "Access denied" });
    }

    const university_id = req.user.userId;

    Credential.findByUniversityId(university_id, (err, credentials) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching credentials" });
      }

      res.json({ credentials });
    });
  },

  // Public credential verification by hash
  verifyCredential: (req, res) => {
    const { hash } = req.params;
    const requestId = Math.random().toString(36).substring(2, 8).toUpperCase(); // Unique ID for tracking

    console.log(`\n🔍 [${requestId}] VERIFICATION REQUEST RECEIVED`);
    console.log(`   Hash: ${hash}`);
    console.log(`   User: ${req.user ? req.user.email : "No user (public)"}`);
    console.log(`   Time: ${new Date().toISOString()}`);
    console.log(`   IP: ${req.ip}`);

    let processingStarted = false;

    const performVerification = (email, type) => {
      // Prevent duplicate processing
      if (processingStarted) {
        console.log(
          `🛑 [${requestId}] DUPLICATE CALL PREVENTED - Already processing`
        );
        return;
      }
      processingStarted = true;

      console.log(`🎯 [${requestId}] Starting verification:`);
      console.log(`   Email: ${email}`);
      console.log(`   Type: ${type}`);

      Credential.verifyByHash(hash, (err, credential) => {
        if (err) {
          console.log(`❌ [${requestId}] Database error:`, err);
          return res.status(500).json({ error: "Error verifying credential" });
        }

        if (!credential) {
          console.log(`❌ [${requestId}] Credential not found`);
          return res.status(404).json({ error: "Credential not found" });
        }

        console.log(`✅ [${requestId}] Credential found: ${credential.title}`);

        // Record verification request
        Verification.create(
          {
            credential_id: credential.id,
            verifier_email: email,
            verifier_type: type,
            status: "verified",
          },
          (verificationErr, result) => {
            if (verificationErr) {
              console.error(
                `❌ [${requestId}] Failed to record verification:`,
                verificationErr
              );
            } else {
              console.log(
                `📝 [${requestId}] Verification recorded - ID: ${result.insertId}`
              );
              console.log(`✅ [${requestId}] REQUEST COMPLETED SUCCESSFULLY\n`);
            }
          }
        );

        res.json({
          verified: true,
          credential,
          message: "Credential verified successfully",
          verified_by: email,
          verifier_type: type,
          request_id: requestId,
        });
      });
    };

    // Determine verifier information
    if (req.user && req.user.userId) {
      console.log(`👤 [${requestId}] User authenticated, fetching details...`);

      User.findById(req.user.userId, (err, user) => {
        if (err || !user) {
          console.log(`⚠️ [${requestId}] User fetch failed, using public`);
          performVerification("public@verification.com", "public");
        } else {
          console.log(
            `✅ [${requestId}] User: ${user.email}, Role: ${user.role}`
          );
          performVerification(user.email, user.role);
        }
      });
    } else {
      console.log(`🌐 [${requestId}] Public verification`);
      performVerification("public@verification.com", "public");
    }
  },

  // Get all credentials (Admin only)
  getAllCredentials: (req, res) => {
    if (req.user.role !== "university") {
      return res.status(403).json({ error: "Access denied" });
    }

    Credential.getAll((err, credentials) => {
      if (err) {
        return res.status(500).json({ error: "Error fetching credentials" });
      }

      res.json({ credentials });
    });
  },
};

module.exports = credentialController;
