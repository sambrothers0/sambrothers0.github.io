<?php
function generateRandomColor() {
    return sprintf('#%06X', mt_rand(0, 0xFFFFFF));
}

function generateRandomSize($min, $max) {
    return rand($min, $max) . 'px';
}

// Generate random CSS properties
$backgroundColor = generateRandomColor();
$fontSize = generateRandomSize(12, 30);
$margin = generateRandomSize(10, 50);

// Create the CSS content
$cssContent = "
body {
    background-color: $backgroundColor;
    font-size: $fontSize;
    margin: $margin;
}
h1 {
    color: $backgroundColor;
}
";

// Generate random HTML content
$htmlContent = "
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Dynamic HTML and CSS Example</title>
    <style>
        $cssContent
    </style>
</head>
<body>
    <h1>Welcome to my dynamically styled website!</h1>
</body>
</html>
";

echo $htmlContent;
?>
