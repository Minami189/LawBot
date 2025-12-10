<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


if(empty($_POST["chatID"])){
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete chat"
    ]);
    exit;
}

$chatID = $_POST["chatID"];

$stmt = $pdo->prepare("DELETE FROM chats WHERE id = ?");
$stmt->execute([$chatID]);



if($stmt){
    echo json_encode([
        "success" => true,
        "message" => "Chat deleted $chatID"
    ]);
}
