<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


if(empty($_POST['userEmail'])){
    echo json_encode([
        "success" => false,
        "message" => "Email is required"
    ]);
    exit;
}

$email = trim($_POST['userEmail']);

// fetch today's logs for the user, newest first
$stmt = $pdo->prepare("
    SELECT *
    FROM logs
    WHERE userEmail = :email
      AND DATE(`date`) = CURDATE()
    ORDER BY `date` DESC
    LIMIT 3
");
$stmt->bindParam(':email', $email, PDO::PARAM_STR);
$stmt->execute();

$recents = $stmt->fetchAll(PDO::FETCH_ASSOC);

// if no logs today, fallback to the latest log overall for this user
if(!$recents){
    $stmt = $pdo->prepare("
        SELECT *
        FROM logs
        WHERE userEmail = :email
        ORDER BY `date` DESC
        LIMIT 1
    ");
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    $recents = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

echo json_encode([
    "success" => true,
    "message" => $recents
]);
