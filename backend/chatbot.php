<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require_once 'db.php';
require __DIR__ . '/vendor/autoload.php'; 
use ArdaGnsrn\Ollama\Ollama;
$client = Ollama::client('http://localhost:11434');

$userEmail;
$typeUser = 'user';
$typeBot = 'bot';


if(!empty($_POST["userEmail"])){
    $userEmail = $_POST["userEmail"]; 
}else{
    echo json_encode([
        "success" => false,
        "message" => "need email to fetch chats"
    ]);
    exit;
}

if (isset($_POST['new_chat'])) {
    $stmt = $pdo->prepare("INSERT INTO chats (userEmail, title) VALUES (:userEmail, :title)");
    $stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
    $stmt->bindParam(':title', $_POST['title'], PDO::PARAM_STR);
    $stmt->execute();
    $chatID = $pdo->lastInsertId();
    
    echo json_encode([
        'success' => true,
        'message' => $chatID
    ]);
    exit;
}


if (empty($_POST['user_input'])) {
    echo json_encode([
        'success' => false,
        'message' => 'No user input provided.'
    ]);
    exit;
}

$content = $_POST['user_input'];

$stmt = $pdo->prepare("SELECT id FROM chats WHERE userEmail = :userEmail ORDER BY id DESC LIMIT 1");
$stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
$stmt->execute();
$existingChat = $stmt->fetch(PDO::FETCH_ASSOC);

if ($existingChat) {
    $chatID = $existingChat['id'];
} 
else {
    $stmt = $pdo->prepare("INSERT INTO chats (userEmail, title) VALUES (:userEmail, 'New Chat')");
    $stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
    $stmt->execute();
    $chatID = $pdo->lastInsertId();
}

$stmt = $pdo->prepare("INSERT INTO messages (chatID, type, content) VALUES (:chatID, :type, :content)");
$stmt->bindParam(':chatID', $chatID, PDO::PARAM_INT);
$stmt->bindParam(':type', $typeUser, PDO::PARAM_STR);
$stmt->bindParam(':content', $content, PDO::PARAM_STR);
$stmt->execute();


$stmt = $pdo->prepare("SELECT * FROM messages WHERE chatID = :chatID");
$stmt->bindParam(':chatID', $chatID, PDO::PARAM_INT);
$stmt->execute();
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
$conversation = '';
foreach($messages as $message){
    $conversation .= $message['type'] . ": " . $message['content'] . "\n\n";
};


try {
    $completion = $client->completions()->create([
        'model' => 'gpt-oss:120b-cloud',
        'prompt' => $conversation
    ]);
} 
catch (\GuzzleHttp\Exception\ServerException $error) {
    echo json_encode(['success' => false, 'message' => 'Ollama server error.']);
    exit;
}

$botResponse = $completion->response;

$stmt = $pdo->prepare("INSERT INTO messages (chatID, type, content) VALUES (:chatID, :type, :content)");
$stmt->bindParam(':chatID', $chatID, PDO::PARAM_INT);
$stmt->bindParam(':type', $typeBot, PDO::PARAM_STR);
$stmt->bindParam(':content', $botResponse, PDO::PARAM_STR);
$stmt->execute();

$stmt = $pdo->prepare("SELECT * FROM messages WHERE chatID = :chatID");
$stmt->bindParam(':chatID', $chatID, PDO::PARAM_INT);
$stmt->execute();
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stmt = $pdo->prepare("SELECT * FROM chats WHERE id = :chatID");;
$stmt->bindParam(':chatID', $chatID, PDO::PARAM_INT);
$stmt->execute();
$chats = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'success' => true,
    'messages' => $messages,
    'chatDetails' => $chats,
]);
?>