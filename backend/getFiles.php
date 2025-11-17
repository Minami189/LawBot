<?php
require_once 'db.php';

$userEmail = 'jermainecamachooo@gmail.com';

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