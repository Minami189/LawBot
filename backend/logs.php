<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
require_once 'db.php';


if(empty($_POST["userEmail"]) || empty($_POST["document"]) || empty($_POST["action"])){
    echo json_encode([
        "success"=>false,
        "message"=>"must fill in all params"
    ]);
    exit;
}

$action = $_POST["action"];
$document =  $_POST["document"];
$userEmail =  $_POST["userEmail"];

$stmt = $pdo->prepare("INSERT INTO logs (document, action, date, userEmail) VALUES (:document, :action, NOW(), :userEmail)");
$stmt->bindParam(':document', $document, PDO::PARAM_STR);
$stmt->bindParam(':action', $action, PDO::PARAM_STR);
$stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
$stmt->execute();

if($stmt){
    echo json_encode([
        "success"=>true,
        "message"=>"successfully added to logs"
    ]);
}
?>