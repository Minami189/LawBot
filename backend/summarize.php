<?php
require_once 'db.php';
require __DIR__ . '/vendor/autoload.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

use ArdaGnsrn\Ollama\Ollama;
use Smalot\PdfParser\Parser;

$client = Ollama::client();

if(empty($_POST["fileID"]) || empty($_POST["chatID"]) || empty($_POST["userEmail"])){
    echo json_encode([
        "success" => false,
        "message" => "missing parameters"
    ]);
    exit;
}

$fileID = $_POST["fileID"];
$chatID  = $_POST["chatID"];



$stmt = $pdo->prepare("SELECT filename, filedata FROM files WHERE id = :id");
$stmt->execute([':id' => $fileID]);
$files = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$files){
    echo json_encode([
        "success" => false,
        "message" => "No files found for the user."
    ]);
    exit;
}

$filename = $files['filename'];
$filedata = $files['filedata'];
$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

$prompt = '';

if (in_array($ext, ['jpg', 'jpeg', 'png'])){
    $base64 = base64_encode($filedata);
    $mime = match ($ext) {
        'jpg', 'jpeg' => 'image/jpeg',
        'png' => 'image/png',
        default => 'application/octet-stream'
    };

    $prompt = "
You are an AI specifically made to give tips and summarizations of legal documents,
documents not connected to law or legal topics should be ignored and replied with,
'The document does not provide enough legal context' 

Format your response to first show the short answer, then the longer more detailed explanation when necessary and add new lines to separate short and detailed clearly

I am giving you an image file. Here is its base64-encoded preview:

MIME type: $mime
Filename: $filename

$base64

Please analyze the image and summarize what's visible.
";

} 
elseif ($ext === 'pdf') {
    $parser = new Parser();
    $pdf = $parser->parseContent($filedata);
    $text = $pdf->getText();

    $text = mb_convert_encoding($text, 'UTF-8', 'UTF-8');
    $prompt = "
You are an AI specifically made to give tips and summarizations of legal documents,
documents not connected to law or legal topics should be ignored and replied with,
'The document does not provide enough legal context' 

Format your response to first show the short answer, then the longer more detailed explanation when necessary and add a <br/> to separate short and detailed clearly

I am giving you a PDF file:

$text


Please summarize the content in plain text only. 
Do NOT use any code blocks, backticks, asterisks, bold, or italic formatting. 
Do NOT return anything in code-style syntax. 
If the original text contains functions, describe their behavior in words rather than showing code. 
Return clean text suitable for direct display.";

}
elseif ($ext === 'txt') {
    $text = mb_convert_encoding($filedata, 'UTF-8', 'UTF-8');
    $prompt = "
You are an AI specifically made to give tips and summarizations of legal documents,
documents not connected to law or legal topics should be ignored and replied with,
'The document does not provide enough legal context' 

Format your response to first show the short answer, then the longer more detailed explanation when necessary and add a <br/> to separate short and detailed clearly
I am giving you a plain text file:

$text

Please summarize the content in plain text only. 
Do NOT include any formatting, code blocks, or special symbols. 
Return clean text suitable for direct display.";
}
else{
    echo json_encode([
        "success" => false,
        "message" => "Unsupported file type: $ext"
    ]);
    exit;
}

$prompt = mb_convert_encoding($prompt, 'UTF-8', 'UTF-8');

try {
    $completion = $client->completions()->create([
        'model' => 'gpt-oss:120b-cloud',
        'prompt' => $prompt
    ]);

    echo json_encode([
        "success" => true,
        "message" => nl2br(htmlspecialchars($completion->response, ENT_QUOTES | ENT_SUBSTITUTE))
    ]);

    $botResponse = nl2br(htmlspecialchars($completion->response, ENT_QUOTES | ENT_SUBSTITUTE));
    $stmt = $pdo->prepare("INSERT INTO messages (chatID, type, content) VALUES (:chatID, :type, :content)");
    $stmt->bindParam(':chatID', $chatID, PDO::PARAM_INT);
    $stmt->bindValue(':type', "bot", PDO::PARAM_STR);
    $stmt->bindParam(':content', $botResponse, PDO::PARAM_STR);
    $stmt->execute();

} catch (\GuzzleHttp\Exception\GuzzleException $error) {
    echo json_encode([
        "success" => false,
        "message" =>"Error sending request to Ollama: " . $error->getMessage()]);
}

$action = "summarize";
// Use the filename we fetched earlier for logging
$document = $filename ?? '';
$userEmail = $_POST["userEmail"];

$stmt = $pdo->prepare("INSERT INTO logs (document, action, date, userEmail) VALUES (:document, :action, NOW(), :userEmail)");
$stmt->bindParam(':document', $document, PDO::PARAM_STR);
$stmt->bindParam(':action', $action, PDO::PARAM_STR);
$stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
$stmt->execute();