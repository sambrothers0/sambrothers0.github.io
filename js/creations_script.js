
const homeButton = document.getElementById("home-button");

let appearanceMode = "dark";

homeButton.onclick = navigateHome;

function navigateHome() {
    window.location.href="index.html"
}

//mouse checker for buttons
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