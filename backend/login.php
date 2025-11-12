<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if(isset($_POST['email'], $_POST['password'])){
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $stmt = $pdo->prepare("SELECT username, password FROM users WHERE email = :email LIMIT 1");
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$user){
        echo "No account found with this email.";
    } 
    elseif(!password_verify($password, $user['password'])){
        echo "Incorrect password.";
    } 
    else {
        echo "Welcome nigga bitch " . $user['username']; 
    }
} 
else {
    die("Email and Password are required.");
}
?>
