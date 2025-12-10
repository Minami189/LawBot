<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

//eto yung para sa jwtkey setup
require_once __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
//for now hardcoded muna since local lang pala
$secretKey = "K8v2Qw7xN9rL4mF6yPz1Tq3Bv8Hs5Xc9AaJk0Zr4Lp2Wm6Yb";
//setup ends here



//kaya ko pinalit to !empty imbes na isset para macheck nya kung walang laman
//kase kahit pag blank pag isset nagttrue paren
if(!empty($_POST['email']) && !empty($_POST['password'])){
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $document = "N/A";
    $action = "Login";


    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email LIMIT 1");
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$user){
        echo json_encode([
            "success"=>false,
            "message"=>"User not found"
        ]);
    } 
    elseif(!password_verify($password, $user['password'])){
        echo json_encode([
            "success"=>false,
            "message"=>"Incorrect password"
        ]);
    } 
    else {
        
        $payload = [
            "username" => $user['username'],
            "email" => $user['email'],
            "storageUsed" => $user['storage_used'],
            "documentsProcessed" => $user['documents_processed']
        ];

        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        echo json_encode([
            "success"=>true,
            "message"=>"Successfully logged in",
            "token"=>$jwt
        ]);

        $stmt = $pdo->prepare("INSERT INTO logs (document, action, date, userEmail) VALUES (:document, :action, NOW(), :userEmail)");
        $stmt->bindParam(':document', $document, PDO::PARAM_STR);
        $stmt->bindParam(':action', $action, PDO::PARAM_STR);
        $stmt->bindParam(':userEmail', $email, PDO::PARAM_STR);
        $stmt->execute();
    }
} 
else {
        echo json_encode([
            "success"=>false,
            "message"=>"Email and username are required."
        ]);
}
?>
