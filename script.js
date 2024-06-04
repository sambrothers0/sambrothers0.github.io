const darkButton = document.getElementById("appearance-button");
const canvas = document.getElementById("cover-canvas");
const ctx = canvas.getContext("2d");

let appearanceMode = "dark";
let lightColor = "#bebebe";
let darkColor = "#1b1b1b";
let lightButtonImg = "image_assets/light_button.png";
let darkButtonImg = "image_assets/dark_button.png";

darkButton.onclick = toggleAppearance;

drawCircle(ctx, 750, 750, 100, lightColor);

function toggleAppearance() {
    if (appearanceMode == "dark") {
        lightMode();
    }
    else {
        darkMode();
    }
}

function darkMode() {
    document.body.style.backgroundColor = darkColor;
    darkButton.style.backgroundColor = lightColor;
    var buttonImage = document.getElementById("button-image");
    buttonImage.src = darkButtonImg;
    
    appearanceMode = "dark";
}

function lightMode() {
    document.body.style.backgroundColor = lightColor;
    var button = document.getElementById("appearance-button");
    button.style.backgroundColor = darkColor;
    var buttonImage = document.getElementById("button-image");
    buttonImage.src = lightButtonImg;
    appearanceMode = "light";
}

function drawCircle(ctx, x, y, radius, fillColor, strokeColor) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
}