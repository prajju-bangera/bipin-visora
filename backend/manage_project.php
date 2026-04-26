<?php
require_once '../config.php';

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in'])) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

header('Content-Type: application/json');

function uploadToCloudinary($file_path) {
    $cloud_name = CLOUDINARY_CLOUD_NAME;
    $api_key = CLOUDINARY_API_KEY;
    $api_secret = CLOUDINARY_API_SECRET;
    $timestamp = time();
    
    // Cloudinary requires signature for authenticated uploads
    $params = "timestamp=$timestamp";
    $signature = sha1($params . $api_secret);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.cloudinary.com/v1_1/$cloud_name/video/upload");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'file' => new CURLFile($file_path),
        'api_key' => $api_key,
        'timestamp' => $timestamp,
        'signature' => $signature
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? '';
    $category = $_POST['category'] ?? '';
    $description = $_POST['description'] ?? '';
    
    $thumbnail_url = '';
    $video_url = '';

    // Handle Thumbnail (Local Upload)
    if (isset($_FILES['thumbnail']) && $_FILES['thumbnail']['error'] === 0) {
        $target_dir = "../upload/";
        if (!file_exists($target_dir)) mkdir($target_dir, 0777, true);
        
        $file_ext = pathinfo($_FILES['thumbnail']['name'], PATHINFO_EXTENSION);
        $file_name = uniqid() . '.' . $file_ext;
        $target_file = $target_dir . $file_name;
        
        if (move_uploaded_file($_FILES['thumbnail']['tmp_name'], $target_file)) {
            $thumbnail_url = 'upload/' . $file_name;
        }
    }

    // Handle Video (Cloudinary)
    if (isset($_FILES['video']) && $_FILES['video']['error'] === 0) {
        $cloudinary_response = uploadToCloudinary($_FILES['video']['tmp_name']);
        if (isset($cloudinary_response['secure_url'])) {
            $video_url = $cloudinary_response['secure_url'];
        } else {
            echo json_encode(['success' => false, 'message' => 'Video upload to Cloudinary failed']);
            exit;
        }
    }

    // Save to Database
    $stmt = $conn->prepare("INSERT INTO projects (title, category, description, thumbnail, video_url) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $title, $category, $description, $thumbnail_url, $video_url);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Project added successfully', 'project_id' => $stmt->insert_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    }
    
    $stmt->close();
}
?>
