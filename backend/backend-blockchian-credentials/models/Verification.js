const db = require("../config/db");

const Verification = {
  // Create verification request
  create: (verificationData, callback) => {
    const {
      credential_id,
      verifier_email,
      verifier_type = "public", // Default to public
      status = "pending",
    } = verificationData;

    const query = `
      INSERT INTO verification_requests (credential_id, verifier_email, verifier_type, status) 
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      query,
      [credential_id, verifier_email, verifier_type, status],
      callback
    );
  },

  // Get verification history for a credential
  findByCredentialId: (credential_id, callback) => {
    const query = `
      SELECT * FROM verification_requests 
      WHERE credential_id = ? 
      ORDER BY verified_at DESC
    `;
    db.query(query, [credential_id], callback);
  },

  // Update verification status
  updateStatus: (id, status, callback) => {
    const query = `
      UPDATE verification_requests 
      SET status = ?, verified_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;
    db.query(query, [status, id], callback);
  },

  // Get all verifications (for admin)
  getAll: (callback) => {
    const query = `
      SELECT vr.*, c.title as credential_title, c.blockchain_hash,
             s.name as student_name, u.name as university_name
      FROM verification_requests vr
      JOIN credentials c ON vr.credential_id = c.id
      JOIN users s ON c.student_id = s.id
      JOIN users u ON c.university_id = u.id
      ORDER BY vr.verified_at DESC
    `;
    db.query(query, callback);
  },
};
module.exports = Verification;
