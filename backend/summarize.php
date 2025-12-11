<?php
require_once 'db.php';
require __DIR__ . '/vendor/autoload.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

use ArdaGnsrn\Ollama\Ollama;
use Smalot\PdfParser\Parser;
try {
    if (empty($_POST["fileID"]) || empty($_POST["chatID"]) || empty($_POST["userEmail"])) {
        throw new Exception("Missing parameters");
    }

    $fileID = $_POST["fileID"];
    $chatID = $_POST["chatID"];
    $userEmail = $_POST["userEmail"];

    $stmt = $pdo->prepare("SELECT filename, filedata FROM files WHERE id = :id");
    $stmt->execute([':id' => $fileID]);
    $file = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$file) {
        throw new Exception("No files found for the user");
    }

    $filename = $file['filename'];
    $filedata = $file['filedata'];
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    $text = '';
    $prompt = '';

    $client = Ollama::client();

    if($ext === 'txt'){
        $text = mb_convert_encoding($filedata, 'UTF-8', 'UTF-8');
        $prompt = "
            You are an AI specifically made to give tips and summarizations of legal documents,
            documents not connected to law or legal topics should be replied with,
            'The document does not provide enough legal context' 

            Format your response to first show the short answer, then the longer more detailed explanation when necessary and add a <br/> to separate short and detailed clearly
            I am giving you a plain text file:

            $text

            Please summarize the content in plain text only. 
            Do NOT include any formatting, code blocks, or special symbols. 
            Return clean text suitable for direct display.";
    }
    elseif($ext === 'pdf'){
        $parser = new Parser();
        $pdf = $parser->parseContent($filedata);
        $text = mb_convert_encoding($pdf->getText(), 'UTF-8', 'UTF-8');
        $prompt = "
            You are an AI specifically made to give tips and summarizations of legal documents,
            documents not connected to law or legal topics should be replied with,
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
    elseif(in_array($ext, ['doc', 'docx'])){
    //creating temp file path
    $tempPath = sys_get_temp_dir() . DIRECTORY_SEPARATOR . uniqid() . ".$ext";
    file_put_contents($tempPath, $filedata);
    try{
        //Parser
        if($ext === 'doc') {
            //use legacy MsDoc reader for old binary DOC
            $phpWord = \PhpOffice\PhpWord\IOFactory::load($tempPath, 'MsDoc');
        } else {
            //docx uses zip/xml so normal loader works
            $phpWord = \PhpOffice\PhpWord\IOFactory::load($tempPath);
        }
        //dividing into sections
        foreach($phpWord->getSections() as $section){
            foreach($section->getElements() as $element){
                if($element instanceof \PhpOffice\PhpWord\Element\Text){
                    $text .= $element->getText() . "\n";
                }

                if($element instanceof \PhpOffice\PhpWord\Element\TextRun){
                    foreach($element->getElements() as $child){
                        if($child instanceof \PhpOffice\PhpWord\Element\Text){
                            $text .= $child->getText() . "\n";
                        }
                        if($child instanceof \PhpOffice\PhpWord\Element\TextBreak){
                            $text .= "\n";
                        }
                    }
                }

                if ($element instanceof \PhpOffice\PhpWord\Element\Table) {
                    foreach($element->getRows() as $row){
                        foreach($row->getCells() as $cell) {
                            foreach($cell->getElements() as $cellElement) {
                                if($cellElement instanceof \PhpOffice\PhpWord\Element\Text){
                                    $text .= $cellElement->getText() . "\t";
                                }
                                if($cellElement instanceof \PhpOffice\PhpWord\Element\TextRun){
                                    foreach ($cellElement->getElements() as $child) {
                                        if ($child instanceof \PhpOffice\PhpWord\Element\Text){
                                            $text .= $child->getText() . " ";
                                        }
                                    }
                                }
                            }
                            $text .= "\n";
                        }
                    }
                }
            }
        }

    }
    //temp file deletion
    finally{
        if (file_exists($tempPath)){
            unlink($tempPath);
            }
        }
    }
    else {
        throw new Exception("Unsupported file type: $ext");
    }
    $text = trim($text);
    $prompt = "
        You are an AI specifically made to give tips and summarizations of legal documents.
        Documents not connected to law or legal topics should be ignored and replied with:
        'The document does not provide enough legal context'.

        Format your response to first show the short answer, then the longer more detailed explanation when necessary and add a <br/> to separate short and detailed clearly
        I am giving you a plain text file:

        $text

        Please summarize the content in plain text only.
        Do NOT include formatting, code blocks, or special symbols.
        Return clean text suitable for direct display.
        ";
    $prompt = mb_convert_encoding($prompt, 'UTF-8', 'UTF-8');

    try{
    $completion = $client->completions()->create([
        'model' => 'gpt-oss:120b-cloud',
        'prompt' => $prompt
    ]);

    // Use plain text directly, no HTML encoding
    $botResponse = trim($completion->response);

    echo json_encode([
        "success" => true,
        "message" => $botResponse
    ]);

    // Save to DB
    $stmt = $pdo->prepare("INSERT INTO messages (chatID, type, content) VALUES (:chatID, :type, :content)");
    $stmt->bindParam(':chatID', $chatID, PDO::PARAM_INT);
    $stmt->bindValue(':type', "bot", PDO::PARAM_STR);
    $stmt->bindParam(':content', $botResponse, PDO::PARAM_STR);
    $stmt->execute();

    }catch (\GuzzleHttp\Exception\GuzzleException $error) {
        echo json_encode([
            "success" => false,
            "message" =>"Error sending request to Ollama: " . $error->getMessage()
        ]);
    }

    $action = "summarize";
    // Use the filename we fetched earlier for logging
    $document = $filename ?? '';
    $userEmail = $_POST["userEmail"];

    $stmt = $pdo->prepare("INSERT INTO logs (document, action, date, userEmail) VALUES (:document, :action, NOW(), :userEmail)");
    $stmt->bindParam(':document', $filename, PDO::PARAM_STR);
    $stmt->bindParam(':action', $action = 'Summarize', PDO::PARAM_STR);
    $stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
    $stmt->execute();

    $stmt = $pdo->prepare("UPDATE users SET documents_processed = documents_processed + 1 WHERE email = :userEmail");
    $stmt->bindParam(':userEmail', $userEmail, PDO::PARAM_STR);
    $stmt->execute();

   

} 
catch(\Throwable $error) {
    ob_clean();
    echo json_encode([
        "success" => false,
        "message" => "Server error: " . $error->getMessage()
    ]);
    exit;
}
