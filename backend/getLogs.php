<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if(empty($_POST["userEmail"])){
    exit;
    echo json_encode([
        "success" => false,
        "logs" => "need email"
    ]);
}

$userEmail = $_POST["userEmail"];

$stmt = $pdo->prepare("SELECT document, action, date FROM logs WHERE userEmail = :userEmail ORDER BY date DESC");
$stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
$stmt->execute();
$logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "message" => $logs
]);
?>