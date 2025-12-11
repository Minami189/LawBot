<?php
require_once 'db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

if (empty($_POST["chatID"])) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete chat: missing chatID"
    ]);
    exit;
}

$chatID = $_POST["chatID"];

try {
    // Ensure both deletions succeed together
    $pdo->beginTransaction();

    // Delete child messages first to satisfy FK constraint
    $stmt = $pdo->prepare("DELETE FROM messages WHERE chatID = ?");
    $stmt->execute([$chatID]);

    // Then delete the chat
    $stmt = $pdo->prepare("DELETE FROM chats WHERE id = ?");
    $stmt->execute([$chatID]);

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Chat deleted $chatID"
    ]);
} catch (\Throwable $error) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete chat: " . $error->getMessage()
    ]);
    exit;
}
