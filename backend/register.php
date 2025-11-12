<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");



//kaya ko pinalit to !empty imbes na isset para macheck nya kung walang laman
//kase kahit pag blank pag isset nagttrue paren
if(!empty($_POST['email']) && !empty($_POST['password']) && !empty($_POST['username']) ){
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);



    $checkStmt = $pdo->prepare("SELECT 1 FROM users WHERE email = :email LIMIT 1");
    $checkStmt->bindParam(':email', $email, PDO::PARAM_STR);
    $checkStmt->execute();

    if($checkStmt->fetch()){
        echo json_encode([
            "success"=> false,
            "message"=>"Email already exists."
        ]);
        return;
    }

    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);

    if($stmt->execute()){
        echo json_encode([
            "success"=>true,
            "message"=>"User registered successfully.",
        ]);
    } 
    else {
        echo json_encode([
            "success"=>false,
            "message"=>"Error registering user",
        ]);
    }
} 
else {
        echo json_encode([
            "success"=>false,
            "message"=>"Username, email, and password are required.",
        ]);
}
?>
