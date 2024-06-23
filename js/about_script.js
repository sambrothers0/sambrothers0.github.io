import { getAppearance, appearanceMode } from "./home_script.js";

const appearanceButton = document.getElementById("appearance-button");
const homeButton = document.getElementById("home-button");
const coverBanner = document.getElementById("cover-banner");

let lightColor = "#bebebe";
let darkColor = "#1b1b1b";
let lightButtonImg = "image_assets/light_button.png";
let darkButtonImg = "image_assets/dark_button.png";
let lightCoverImage = "image_assets/light_cover_image.png";
let darkCoverImage = "image_assets/dark_cover_image.png";

homeButton.onclick = navigateHome;
appearanceButton.onclick = toggleAppearance;

function toggleAppearance() {
    if (getAppearance() == "dark"){
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
    appearanceButton.style.border = "3px solid " + darkColor;

    var appearanceButtonImage = document.getElementById("appearance-button-image");
    appearanceButtonImage.src = darkButtonImg;
}

function lightMode() {
    document.body.style.backgroundColor = lightColor;

    coverBanner.style.backgroundColor = darkColor;
    appearanceButton.style.backgroundColor = darkColor;
    appearanceButton.style.border = "3px solid " + lightColor;

    var appearanceButtonImage = document.getElementById("appearance-button-image");
    appearanceButtonImage.src = lightButtonImg;
}

document.addEventListener('DOMContentLoaded', function () {
    const button = appearanceButton
    const image = document.getElementById('appearance-button-image');

    // Flag to track mouse position
    let mouseX = 0;
    let mouseY = 0;

    // Update mouse coordinates on mouse move
    document.addEventListener('mousemove', function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    // Function to check if mouse is over the button
    function isMouseOverElement(element) {
        const hoveredElement = document.elementFromPoint(mouseX, mouseY);
        return element.contains(hoveredElement);
    }

    // Function to force a check of the mouse position
    function forceCheckMousePosition() {
        if (isMouseOverElement(button)) {
            if (appearanceMode == "dark") {
                image.src = 'image_assets/dark_button_hover.png'; // Change image source
            }
            else {
                image.src = 'image_assets/light_button_hover.png'; // Change image source
            }
        } else {
            if (appearanceMode == "dark") {
                image.src = 'image_assets/dark_button.png'; // Change image source
            }
            else {
                image.src = 'image_assets/light_button.png'; // Change image source
            }
        }
    }
    
    setInterval(forceCheckMousePosition, 1);
});