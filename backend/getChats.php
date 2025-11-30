<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$userEmail;

if(!empty($_POST["userEmail"])){
    $userEmail = $_POST["userEmail"]; 
}else{
    echo json_encode([
        "success" => false,
        "message" => "need email to fetch chats"
    ]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT * FROM chats WHERE userEmail = :email
");


$stmt->execute([
    ':email' => $userEmail,
]);

$chats = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "message" => "Successfully fetched chats",
    "chats" => $chats,
]);
