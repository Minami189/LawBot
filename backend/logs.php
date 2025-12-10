<?php
require_once 'db.php';


if(empty($_POST["userEmail"]) || empty($_POST["document"]) || empty($_POST["action"])){
    exit;
}

$action = empty($_POST["action"]);
$document =  empty($_POST["document"]);
$userEmail =  empty($_POST["userEmail"]);

$stmt = $pdo->prepare("INSERT INTO logs (document, action, date, userEmail) VALUES (:document, :action, NOW(), :userEmail)");
$stmt->bindParam(':document', $document, PDO::PARAM_STR);
$stmt->bindParam(':action', $action, PDO::PARAM_STR);
$stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
$stmt->execute();
?>