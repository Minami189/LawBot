<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


if (empty($_FILES['file']['name']) || $_FILES['file']['error'] != UPLOAD_ERR_OK) {
    echo json_encode(["success" => false, "message" => "No file uploaded or upload error"]);
    exit;
    return;
}

$userEmail;
if(empty($_POST['userEmail'])){
    echo json_encode(["success" => false, "message" => "User email is required"]);
    exit;
    return;
}

$userEmail = $_POST['userEmail'];

$file = $_FILES['file'];
$filename = basename($file['name']);
//Stored as BLOB, kinukuha binary content ng file
$filedata = file_get_contents($file['tmp_name']);


$allowedExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'txt', 'doc', 'docx'];
$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
if (!in_array($ext, $allowedExtensions)) {
    echo json_encode([
        "success" => false,
        "message" => "File type not allowed. Allowed: PNG, JPG, PDF, TXT, DOC"
    ]);
    exit;
}

$allowedMimes = [
    'image/png', 
    'image/jpeg', 
    'application/pdf', 
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

if (!in_array($file['type'], $allowedMimes)) {
    echo json_encode([
        "success" => false,
        "message" => "File MIME type not allowed."
    ]);
    exit;
}

$stmt = $pdo->prepare("
    INSERT INTO files (user_email, filename, filedata) 
    VALUES (:email, :filename, :filedata)
");
$stmt->execute([
    ':email' => $userEmail,
    ':filename' => $filename,
    ':filedata' => $filedata
]);

echo json_encode([
    "success" => true,
    "message" => "File uploaded successfully",
    "filename" => $filename,
    "uploaded_at" => date(("Y-m-d H:i:s"))
]);
