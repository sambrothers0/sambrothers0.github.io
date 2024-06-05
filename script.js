const appearanceButton = document.getElementById("appearance-button");
const coverBanner = document.getElementById("cover-banner");
const canvas = document.getElementById("cover-canvas");
const ctx = canvas.getContext("2d");

let appearanceMode = "dark";
let lightColor = "#bebebe";
let darkColor = "#1b1b1b";
let lightButtonImg = "image_assets/light_button.png";
let darkButtonImg = "image_assets/dark_button.png";
let lightCoverImage = "image_assets/light_cover_image.png";
let darkCoverImage = "image_assets/dark_cover_image.png";


appearanceButton.onclick = toggleAppearance;

startBlinking();

function startBlinking() {
    window.setInterval(blinking,1500);
 }

function blinking() {
    if (appearanceMode == "dark") {
        drawCircle(ctx, 1180, 275, 25, lightColor);
    }
    else {
        drawCircle(ctx, 1180, 275, 25, darkColor);
    }
    window.setTimeout(function(){
       ctx.clearRect(1150, 250, 1250, 300);
  },750)
}

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

    coverBanner.style.backgroundColor = lightColor;
    appearanceButton.style.backgroundColor = lightColor;
    appearanceButton.style.border = "3px solid #1b1b1b";
    var buttonImage = document.getElementById("button-image");
    buttonImage.src = darkButtonImg;

    var coverImage = document.getElementById("cover-image");
    coverImage.src = darkCoverImage;

    var textContainer = document.getElementById("text-container")
    textContainer.style.color = lightColor;

    appearanceMode = "dark";
}

function lightMode() {
    document.body.style.backgroundColor = lightColor;

    coverBanner.style.backgroundColor = darkColor;
    appearanceButton.style.backgroundColor = darkColor;
    appearanceButton.style.border = "3px solid #bebebe";

    var buttonImage = document.getElementById("button-image");
    buttonImage.src = lightButtonImg;

    var coverImage = document.getElementById("cover-image");
    coverImage.src = lightCoverImage;

    var textContainer = document.getElementById("text-container")
    textContainer.style.color = darkColor;

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