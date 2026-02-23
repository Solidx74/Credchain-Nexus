const db = require("../config/db");
const crypto = require("crypto");

const Credential = {
  // Issue new credential
  create: (credentialData, callback) => {
    const { student_id, university_id, title, description, issue_date } =
      credentialData;

    // Generate blockchain hash (simulation)
    const blockchain_hash = crypto
      .createHash("sha256")
      .update(`${student_id}${university_id}${title}${Date.now()}`)
      .digest("hex");

    const query = `
      INSERT INTO credentials (student_id, university_id, title, description, issue_date, blockchain_hash) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        student_id,
        university_id,
        title,
        description,
        issue_date,
        blockchain_hash,
      ],
      (err, result) => {
        if (err) return callback(err);
        callback(null, {
          id: result.insertId,
          blockchain_hash,
        });
      }
    );
  },

  // Get credential by ID
  findById: (id, callback) => {
    const query = `
      SELECT c.*, s.name as student_name, u.name as university_name 
      FROM credentials c
      JOIN users s ON c.student_id = s.id
      JOIN users u ON c.university_id = u.id
      WHERE c.id = ?
    `;
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  // Get all credentials for a student
  findByStudentId: (student_id, callback) => {
    const query = `
      SELECT c.*, u.name as university_name 
      FROM credentials c
      JOIN users u ON c.university_id = u.id
      WHERE c.student_id = ?
      ORDER BY c.issue_date DESC
    `;
    db.query(query, [student_id], callback);
  },

  // Get all credentials issued by a university
  findByUniversityId: (university_id, callback) => {
    const query = `
      SELECT c.*, s.name as student_name, s.email as student_email
      FROM credentials c
      JOIN users s ON c.student_id = s.id
      WHERE c.university_id = ?
      ORDER BY c.created_at DESC
    `;
    db.query(query, [university_id], callback);
  },

  // Verify credential by blockchain hash
  verifyByHash: (blockchain_hash, callback) => {
    const query = `
      SELECT c.*, s.name as student_name, u.name as university_name 
      FROM credentials c
      JOIN users s ON c.student_id = s.id
      JOIN users u ON c.university_id = u.id
      WHERE c.blockchain_hash = ?
    `;
    db.query(query, [blockchain_hash], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  // Get all credentials (for admin)
  getAll: (callback) => {
    const query = `
      SELECT c.*, s.name as student_name, u.name as university_name 
      FROM credentials c
      JOIN users s ON c.student_id = s.id
      JOIN users u ON c.university_id = u.id
      ORDER BY c.created_at DESC
    `;
    db.query(query, callback);
  },
};

module.exports = Credential;
