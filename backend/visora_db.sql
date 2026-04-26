CREATE DATABASE IF NOT EXISTS visora_db;
USE visora_db;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    thumbnail VARCHAR(255),
    video_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_stats (
    id INT PRIMARY KEY,
    visitor_count INT DEFAULT 0
);

INSERT IGNORE INTO site_stats (id, visitor_count) VALUES (1, 0);

-- Insert default categories
INSERT IGNORE INTO categories (name) VALUES ('Commercial'), ('Music Videos'), ('Wedding'), ('Social Media');
