const db = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
  // Create new user
  create: (userData, callback) => {
    const { name, email, password, role } = userData;

    // Hash password before saving
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return callback(err);

      const query = `
        INSERT INTO users (name, email, password, role) 
        VALUES (?, ?, ?, ?)
      `;

      db.query(query, [name, email, hashedPassword, role], callback);
    });
  },

  // Find user by email
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]); // Return first user found
    });
  },

  // Find user by ID
  findById: (id, callback) => {
    const query =
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  // Get all users (for admin)
  getAll: (callback) => {
    const query = "SELECT id, name, email, role, created_at FROM users";
    db.query(query, callback);
  },
};

module.exports = User;
