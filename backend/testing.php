<?php
require __DIR__ . '/vendor/autoload.php';
use ArdaGnsrn\Ollama\Ollama;

$client = Ollama::client('http://localhost:11434');

$completion = $client->completions()->create([
        'model' => 'gpt-oss:120b-cloud',
        'prompt' => 'can you scan images',
    ]);

    echo "<h2>AI Response:</h2>";
    echo $completion->response;
?>