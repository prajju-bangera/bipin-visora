<?php
require_once '../config.php';

// Increment visitor count in site_stats
$conn->query("UPDATE site_stats SET visitor_count = visitor_count + 1 WHERE id = 1");

// Return current count
$result = $conn->query("SELECT visitor_count FROM site_stats WHERE id = 1");
$row = $result->fetch_assoc();

header('Content-Type: application/json');
echo json_encode(['success' => true, 'visitor_count' => $row['visitor_count']]);
?>
