<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


if( empty($_POST["fileID"]) || empty($_POST["userEmail"]) ){
    exit;
}

$fileID = $_POST["fileID"];
$userEmail = $_POST["userEmail"];


// get the size of the file being removed so we can deduct it from storage_used
$sizeStmt = $pdo->prepare("SELECT filename, OCTET_LENGTH(filedata) AS size_bytes FROM files WHERE id = ?");
$sizeStmt->execute([$fileID]);
$fileRow = $sizeStmt->fetch(PDO::FETCH_ASSOC);
$fileSizeBytes = (int) ($fileRow['size_bytes'] ?? 0);
$filename = $fileRow['filename'] ?? '';

// delete the file record
$deleteStmt = $pdo->prepare("DELETE FROM files WHERE id = ?");
$deleteStmt->execute([$fileID]);

// deduct used storage (never below zero)
$updateStmt = $pdo->prepare("
    UPDATE users
    SET storage_used = GREATEST(storage_used - ?, 0)
    WHERE email = ?
");
$updateStmt->execute([$fileSizeBytes, $userEmail]);


$action = "Delete";
// Use the filename we fetched earlier for logging
$document = $filename;
$userEmail = $_POST["userEmail"];

$stmt = $pdo->prepare("INSERT INTO logs (document, action, date, userEmail) VALUES (:document, :action, NOW(), :userEmail)");
$stmt->bindParam(':document', $document, PDO::PARAM_STR);
$stmt->bindParam(':action', $action, PDO::PARAM_STR);
$stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
$stmt->execute();

echo json_encode([
    "success" => true,
    "message" => "File deleted"
]);