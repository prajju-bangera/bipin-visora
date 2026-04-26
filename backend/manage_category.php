<?php
require_once '../config.php';

if (!isset($_SESSION['admin_logged_in'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

header('Content-Type: application/json');

$action = $_POST['action'] ?? '';

if ($action === 'fetch') {
    $result = $conn->query("SELECT * FROM categories ORDER BY name ASC");
    $categories = [];
    while($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
    echo json_encode(['success' => true, 'data' => $categories]);
} 
elseif ($action === 'add') {
    $name = $_POST['name'] ?? '';
    $stmt = $conn->prepare("INSERT INTO categories (name) VALUES (?)");
    $stmt->bind_param("s", $name);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Category added']);
    } else {
        echo json_encode(['success' => false, 'message' => $conn->error]);
    }
}
elseif ($action === 'delete') {
    $id = $_POST['id'] ?? '';
    $stmt = $conn->prepare("DELETE FROM categories WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Category deleted']);
    } else {
        echo json_encode(['success' => false, 'message' => $conn->error]);
    }
}
?>
