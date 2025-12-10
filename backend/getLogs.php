<?php
require_once 'db.php';

$stmt = $pdo->prepare("SELECT document, action, date FROM logs WHERE userEmail = :userEmail");
$stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
$stmt->execute();
$logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "success" => true,
    "logs" => $logs
]);
?>