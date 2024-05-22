<?php
session_start();
header("Content-Type: text/html");

if (!isset($_SESSION['html'])) {
    $backgroundColor = sprintf('#%06X', mt_rand(0, 0xFFFFFF));
    $fontSize = rand(12, 30) . 'px';
    $margin = rand(10, 50) . 'px';

    $_SESSION['html'] = "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Dynamic CSS Example</title>
        <link rel='stylesheet' type='text/css' href='generate_css.php'>
    </head>
    <body>
        <h1>Welcome to my dynamically styled website!</h1>
    </body>
    </html>

    ";
}

echo $_SESSION['html'];