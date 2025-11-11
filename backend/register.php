<?php
require_once 'db.php';

if(isset($_POST['username'], $_POST['email'], $_POST['password'])){
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $checkStmt = $pdo->prepare("SELECT 1 FROM users WHERE email = :email LIMIT 1");
    $checkStmt->bindParam(':email', $email, PDO::PARAM_STR);
    $checkStmt->execute();

    if($checkStmt->fetch()){
        die("Email already exists.");
    }

    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $hashedPassword, PDO::PARAM_STR);

    if($stmt->execute()){
        echo "User registered successfully.";
    } 
    else {
        echo "Error registering user.";
    }
} 
else {
    die("Username, Email and Password are required.");
}
?>
