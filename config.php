<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'visora_db');

// Cloudinary Configuration
define('CLOUDINARY_URL', 'cloudinary://API_KEY:API_SECRET@CLOUD_NAME');
define('CLOUDINARY_CLOUD_NAME', 'your_cloud_name');
define('CLOUDINARY_API_KEY', 'your_api_key');
define('CLOUDINARY_API_SECRET', 'your_api_secret');

// Establishing Connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Start Session
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
