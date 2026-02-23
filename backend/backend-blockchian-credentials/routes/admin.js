router.get("/verifications", (req, res) => {
  const query = `
    SELECT 
      vr.*,
      c.title as credential_title,
      c.blockchain_hash,
      s.name as student_name,
      u.name as university_name,
      CASE 
        WHEN vr.verifier_type = 'public' THEN 'Anonymous Public User'
        WHEN vr.verifier_type = 'student' THEN CONCAT('Student: ', vr.verifier_email)
        WHEN vr.verifier_type = 'university' THEN CONCAT('University: ', vr.verifier_email)
        WHEN vr.verifier_type = 'employer' THEN CONCAT('Employer: ', vr.verifier_email)
        ELSE vr.verifier_email
      END as verifier_details
    FROM verification_requests vr
    JOIN credentials c ON vr.credential_id = c.id
    JOIN users s ON c.student_id = s.id
    JOIN users u ON c.university_id = u.id
    ORDER BY vr.verified_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Database error", details: err.message });
    }

    res.json({
      message: "Verification requests",
      count: results.length,
      verifications: results,
    });
  });
});
