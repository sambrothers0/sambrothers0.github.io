module.exports = {
    getAppearance,
    appearanceMode
}

const appearanceButton = document.getElementById("appearance-button");
const homeButton = document.getElementById("home-button");
const aboutButton = document.getElementById("about-button");
const creationsButton = document.getElementById("creations-button");
const contactButton = document.getElementById("contact-button");
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
homeButton.onclick = navigateHome;
aboutButton.onclick = navigateAbout;
creationsButton.onclick = navigateCreations;
contactButton.onclick = navigateContact;


startBlinking();

function getAppearance() {
    return appearanceMode;
}

function toggleAppearance() {
    if (appearanceMode == "dark") {
        lightMode();
    }
    else {
        darkMode();
    }
}

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

function navigateHome() {
    window.location.href="index.html"
}

function navigateAbout() {
    window.location.href="about.html"
}

function navigateCreations() {
    window.location.href="creations.html"
}

function navigateContact() {
    window.location.href="contact.html"
}

function darkMode() {
    document.body.style.backgroundColor = darkColor;

    coverBanner.style.backgroundColor = lightColor;
    appearanceButton.style.backgroundColor = lightColor;
    appearanceButton.style.border = "3px solid #1b1b1b";

    var appearanceButtonImage = document.getElementById("appearance-button-image");
    appearanceButtonImage.src = darkButtonImg;

    var coverImage = document.getElementById("cover-image");
    coverImage.src = darkCoverImage;

    var textContainers = document.querySelectorAll(".text-container");
    for (let i = 0; i < textContainers.length; i++) {
        textContainers[i].style.color = lightColor;
    }

    homeButton.style.backgroundColor = lightColor;
    homeButton.style.border = "3px solid #1b1b1b";

    appearanceMode = "dark";
}

function lightMode() {
    document.body.style.backgroundColor = lightColor;

    coverBanner.style.backgroundColor = darkColor;
    appearanceButton.style.backgroundColor = darkColor;
    appearanceButton.style.border = "3px solid #bebebe";

    var appearanceButtonImage = document.getElementById("appearance-button-image");
    appearanceButtonImage.src = lightButtonImg;

    var coverImage = document.getElementById("cover-image");
    coverImage.src = lightCoverImage;

    var textContainers = document.querySelectorAll(".text-container");
    for (let i = 0; i < textContainers.length; i++) {
        textContainers[i].style.color = darkColor;
    }

    var lowerPanelShadows = document.querySelectorAll(".lower-panel:hover");
    for (let i = 0; i < lowerPanelShadows.length; i++) {
        lowerPanelShadows[i].style.boxShadow = "0px 0px 20px 8px rgba(0, 0, 0, 1)";
    } // this shit broke

    homeButton.style.backgroundColor = darkColor;
    homeButton.style.border = "3px solid #bebebe";

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

document.addEventListener('DOMContentLoaded', function () {
    const line = document.getElementById('horizontal-line');
    const offset = 150; // Trigger the animation a bit before the element is fully in view

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    }

    function onScroll() {
        if (isElementInViewport(line)) {
            line.classList.add('animated');
            window.removeEventListener('scroll', onScroll);
        }
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
});

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('appearance-button');
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
    function checkOverAppearance() {
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
    
    setInterval(checkOverAppearance, 1);
});