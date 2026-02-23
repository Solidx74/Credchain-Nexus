-- schema.sql
CREATE DATABASE IF NOT EXISTS blockchain_credentials;
USE blockchain_credentials;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'university', 'employer') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create credentials table
CREATE TABLE IF NOT EXISTS credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    university_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    issue_date DATE NOT NULL,
    blockchain_hash VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (university_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create verification_requests table
CREATE TABLE IF NOT EXISTS verification_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    credential_id INT NOT NULL,
    verifier_email VARCHAR(100) NOT NULL,
    verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (credential_id) REFERENCES credentials(id) ON DELETE CASCADE
);

ALTER TABLE verification_requests 
ADD COLUMN verifier_type ENUM('public', 'student', 'university', 'employer') DEFAULT 'public' AFTER verifier_email;