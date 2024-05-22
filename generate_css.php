<?php
session_start();
header("Content-Type: text/css");

if (!isset($_SESSION['css'])) {
    $backgroundColor = sprintf('#%06X', mt_rand(0, 0xFFFFFF));
    $fontSize = rand(12, 30) . 'px';
    $margin = rand(10, 50) . 'px';

    $_SESSION['css'] = "
    body {
        background-color: $backgroundColor;
        font-size: $fontSize;
        margin: $margin;
    }
    h1 {
        color: $backgroundColor;
    }
    ";
}

echo $_SESSION['css'];
?>
