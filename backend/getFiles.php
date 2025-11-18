<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$userEmail;
if(empty($_POST["userEmail"])){
    return;
}

$userEmail = $_POST["userEmail"];

$stmt = $pdo->prepare("SELECT id, filename FROM files WHERE user_email = :email");
$stmt->execute([':email' => $userEmail]);
$files = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (empty($files)) {
    echo json_encode([
        "success" => false,
        "message" => "No files found."
    ]);
    exit;
}
else{
    echo json_encode([
        "success" => true,
        "files" => $files
    ]);
}
?>