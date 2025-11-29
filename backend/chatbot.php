<?php
header('chat.html');
require_once 'db.php';
require __DIR__ . '/vendor/autoload.php'; 
use ArdaGnsrn\Ollama\Ollama;
$client = Ollama::client('http://localhost:11434');

$uid = 1;
$typeUser = 'user';
$typeBot = 'bot';

if (isset($_POST['new_chat'])) {
    $stmt = $pdo->prepare("INSERT INTO chats (uid, title) VALUES (:uid, 'New Chat')");
    $stmt->bindParam(':uid', $uid, PDO::PARAM_INT);
    $stmt->execute();

    $chatID = $pdo->lastInsertId();

    header("Location: chat.html?chatID=" . $chatID);
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

$stmt = $pdo->prepare("SELECT id FROM chats WHERE uid = :uid ORDER BY id DESC LIMIT 1");
$stmt->bindParam(':uid', $uid, PDO::PARAM_INT);
$stmt->execute();
$existingChat = $stmt->fetch(PDO::FETCH_ASSOC);

if ($existingChat) {
    $chatID = $existingChat['id'];
} 
else {
    $stmt = $pdo->prepare("INSERT INTO chats (uid, title) VALUES (:uid, 'New Chat')");
    $stmt->bindParam(':uid', $uid, PDO::PARAM_INT);
    $stmt->execute();
    $chatID = $pdo->lastInsertId();
}

$stmt = $pdo->prepare("INSERT INTO messages (chatID, type, content) VALUES (:chatID, :type, :content)");
$stmt->bindParam(':chatID', $chatID, PDO::PARAM_INT);
$stmt->bindParam(':type', $typeUser, PDO::PARAM_STR);
$stmt->bindParam(':content', $content, PDO::PARAM_STR);
$stmt->execute();

try {
    $completion = $client->completions()->create([
        'model' => 'gpt-oss:120b-cloud',
        'prompt' => $content
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