<?php
require_once 'db.php';

$action = "upload";
$document = "test - korean nigga";
$userEmail = "test@gmail.com";

$stmt = $pdo->prepare("INSERT INTO logs (document, action, date, userEmail) VALUES (:document, :action, NOW(), :userEmail)");
$stmt->bindParam(':document', $document, PDO::PARAM_STR);
$stmt->bindParam(':action', $action, PDO::PARAM_STR);
$stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
$stmt->execute();
?>