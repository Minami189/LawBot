<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


$chatID;

if(empty($_POST['chatID'])){
    echo json_encode(["success" => false, "message" => "Incomplete parameters"]);
    exit;
    return;
}

$chatID = $_POST["chatID"];

$stmt = $pdo->prepare("
    SELECT * FROM messages WHERE chatID = :chatID
");

$stmt->execute([
    ':chatID' => $chatID,
]);

$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "message" => $messages,
]);