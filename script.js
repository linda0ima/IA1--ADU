// Get the required elements
const changeColorBtn = document.getElementById('changeColorBtn');
const toggleSoundBtn = document.getElementById('toggleSoundBtn');
const backgroundSound = document.getElementById('backgroundSound');
const soundIcon = toggleSoundBtn.querySelector('img');
const fontSizeButtons = document.querySelectorAll('#fontSizeControls button');
const body = document.body;
const header = document.querySelector('header');
const increaseFontButton = document.getElementById('increaseFont');
const decreaseFontButton = document.getElementById('decreaseFont');

// Base font size for the body and header
let bodyFontSize = 1; // Start with 1em (16px)
let headerFontSize = 1.375; // Start with 1.375em (22px)

// Function to toggle high contrast mode
function toggleContrastMode() {
    const isHighContrast = body.style.backgroundColor === 'black';

    // Toggle body background and text colors
    body.style.backgroundColor = isHighContrast ? '#ffffff' : 'black';
    body.style.color = isHighContrast ? 'black' : 'white';

    // Toggle the High Contrast button appearance
    changeColorBtn.style.backgroundColor = isHighContrast ? '#000000' : 'white';

    // Toggle the icon for the High Contrast button
    const img = changeColorBtn.querySelector('img');
    img.src = isHighContrast ? 'highcontrast2.png' : 'highcontrast.png';

    // Update font size control buttons
    fontSizeButtons.forEach(button => {
        button.style.backgroundColor = isHighContrast ? '#000000' : 'white';
        button.style.color = isHighContrast ? 'white' : 'black';
    });

    // Update Sound button style
    toggleSoundBtn.style.backgroundColor = isHighContrast ? '#000000' : 'white';

    // Update the sound icon based on the contrast mode and the sound state
    updateSoundIcon(); // Ensure the sound icon updates when contrast mode changes
}

// Function to update sound icon based on sound state and high contrast mode
function updateSoundIcon() {
    const isHighContrast = body.style.backgroundColor === 'black';

    if (backgroundSound.paused) {
        // Sound is off, set the "off" icon based on contrast mode
        soundIcon.src = isHighContrast ? 'soundoffblack.png' : 'soundoff.png';
    } else {
        // Sound is on, set the "on" icon based on contrast mode
        soundIcon.src = isHighContrast ? 'soundonblack.png' : 'soundon.png';
    }
}

// Add event listener to the High Contrast button
changeColorBtn.addEventListener('click', toggleContrastMode);

// Function to increase font size
function increaseFontSize() {
    bodyFontSize += 0.1; // Increase by 0.1em for body text
    headerFontSize += 0.05; // Increase by a smaller amount for header text
    updateFontSize();
}

// Function to decrease font size
function decreaseFontSize() {
    if (bodyFontSize > 0.6) { // Prevent shrinking below a readable size
        bodyFontSize -= 0.1; // Decrease by 0.1em for body text
        headerFontSize -= 0.05; // Decrease by a smaller amount for header text
        updateFontSize();
    }
}

// Function to update font sizes
function updateFontSize() {
    body.style.fontSize = bodyFontSize + 'em'; // Set body text size
    header.style.fontSize = headerFontSize + 'em'; // Set header size
}

// Add event listeners for font size controls
increaseFontButton.addEventListener('click', increaseFontSize);
decreaseFontButton.addEventListener('click', decreaseFontSize);

// Function to toggle sound playback and update the icon
function toggleSound() {
    if (backgroundSound.paused) {
        // Start playing the sound
        backgroundSound.currentTime = 0; // Restart sound
        backgroundSound.play();
    } else {
        // Pause the sound
        backgroundSound.pause();
        backgroundSound.currentTime = 0; // Reset sound to the start
    }
    // Update the sound icon based on whether the sound is on or off and the contrast mode
    updateSoundIcon();
}

// Add event listener for the Sound button
toggleSoundBtn.addEventListener('click', toggleSound);

const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update aria-selected for tabs
        tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
        tab.setAttribute('aria-selected', 'true');

        // Show/Hide tab panels
        panels.forEach(panel => panel.hidden = true);
        const panelId = tab.getAttribute('aria-controls');
        document.getElementById(panelId).hidden = false;
    });

    tab.addEventListener('keydown', (e) => {
        let newTab;
        if (e.key === 'ArrowRight') {
            newTab = tab.nextElementSibling || tabs[0];
        } else if (e.key === 'ArrowLeft') {
            newTab = tab.previousElementSibling || tabs[tabs.length - 1];
        }

        if (newTab) {
            tab.setAttribute('tabindex', '-1');
            newTab.setAttribute('tabindex', '0');
            newTab.focus();
        }
    });
});

// Create an array of focusable elements, explicitly ordering them
const focusableElements = [
    document.getElementById("headingsContainer"),   // Heading 1 and 2 together
    document.getElementById("changeColorBtn"),      // High Contrast button
    document.getElementById("toggleSoundBtn"),      // Sound button
    document.querySelector("p"),                    // Paragraph text
    document.getElementById("increaseFont"),        // Increase Font button
    document.getElementById("decreaseFont"),        // Decrease Font button
    document.getElementById("rightImage")           // Image
];

// Initially, ensure that all elements are focusable by setting tabindex
focusableElements.forEach((el, index) => {
    el.setAttribute("tabindex", index + 1); // +1 because tabindex starts from 1
});



// Handle keyboard navigation
document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
        let currentIndex = focusableElements.findIndex(el => el === document.activeElement);

        if (e.shiftKey) {
            // Shift + Tab for backward navigation
            currentIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
        } else {
            // Normal Tab for forward navigation
            currentIndex = (currentIndex + 1) % focusableElements.length;
        }

        // Focus the appropriate element in the tab order
        focusableElements[currentIndex].focus();
        e.preventDefault(); // Prevent default tab behavior
    }
});


// Get the required elements
const img = document.getElementById('rightImage');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorDisplay = document.getElementById('color-display');

// Once the image is loaded, set up the canvas
img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0); // Draw the image on the canvas
};

// Function to check if the color is red
function isRed(r, g, b) {
    return r > 150 && g < 100 && b < 100; // Predominantly red
}

// Function to check if the color is green
function isGreen(r, g, b) {
    return g > 150 && r < 100 && b < 100; // Predominantly green
}

// Function to check if the color is blue
function isBlue(r, g, b) {
    return b > 150 && r < 100 && g < 100; // Predominantly blue
}

// Function to handle mouse movement and detect color
function getColorAtMouse(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    // Ensure mouse is inside the canvas boundary
    if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) return;

    // Get pixel data from the canvas at (x, y)
    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    // Extract the RGB values
    const r = data[0];
    const g = data[1];
    const b = data[2];

    // Check the color under the mouse
    if (isRed(r, g, b)) {
        colorDisplay.textContent = 'Color: Red';
        colorDisplay.style.left = `${x + 10}px`;  // Position display near cursor
        colorDisplay.style.top = `${y + 10}px`;
        colorDisplay.style.color = 'red';  // Red text color
    } else if (isGreen(r, g, b)) {
        colorDisplay.textContent = 'Color: Green';
        colorDisplay.style.left = `${x + 10}px`;
        colorDisplay.style.top = `${y + 10}px`;
        colorDisplay.style.color = 'green';  // Green text color
    } else if (isBlue(r, g, b)) {
        colorDisplay.textContent = 'Color: Blue';
        colorDisplay.style.left = `${x + 10}px`;
        colorDisplay.style.top = `${y + 10}px`;
        colorDisplay.style.color = 'blue';  // Blue text color
    } else {
        colorDisplay.textContent = 'Color: Unknown';
        colorDisplay.style.left = `${x + 10}px`;
        colorDisplay.style.top = `${y + 10}px`;
        colorDisplay.style.color = 'white';  // Default text color
    }
}

// Add event listener for mouse movement on the image
img.addEventListener('mousemove', getColorAtMouse);

// Ensure the image is loaded and accessible for pixel reading
document.addEventListener('mousemove', function(event) {
    var imageElement = document.getElementById('rightImage');
    var x = event.pageX;
    var y = event.pageY;

    // Create a canvas to get the image data
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // Set canvas size to the image size
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    // Draw the image onto the canvas at the correct position
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    // Get the pixel data at the mouse position
    var pixel = ctx.getImageData(x - imageElement.offsetLeft, y - imageElement.offsetTop, 1, 1).data;
    
    // Convert the pixel data to an RGB string
    var color = 'rgb(' + pixel[0] + ',' + pixel[1] + ',' + pixel[2] + ')';

    // Update the color display text
    var colorDisplay = document.getElementById('color-display');
    colorDisplay.textContent = color;  // Display the color under the mouse
    colorDisplay.style.left = x + 10 + 'px';  // Position the text to the right of the mouse
    colorDisplay.style.top = y + 10 + 'px';  // Position the text just below the mouse
});
// List of known colors with their RGB values
const colorNames = [
    { name: 'Red', rgb: [255, 0, 0] },
    { name: 'Green', rgb: [0, 255, 0] },
    { name: 'Blue', rgb: [0, 0, 255] },
    { name: 'Black', rgb: [0, 0, 0] },
    { name: 'White', rgb: [255, 255, 255] },
    { name: 'Gray', rgb: [128, 128, 128] },
    { name: 'Yellow', rgb: [255, 255, 0] },
    { name: 'Cyan', rgb: [0, 255, 255] },
    { name: 'Magenta', rgb: [255, 0, 255] },
    // Add more colors if needed
];

// Function to calculate the distance between two colors in RGB space
function colorDistance(rgb1, rgb2) {
    const rDiff = rgb1[0] - rgb2[0];
    const gDiff = rgb1[1] - rgb2[1];
    const bDiff = rgb1[2] - rgb2[2];
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff); // Euclidean distance
}

// Ensure the image is loaded and accessible for pixel reading
document.addEventListener('mousemove', function(event) {
    var imageElement = document.getElementById('rightImage');
    var x = event.pageX;
    var y = event.pageY;

    // Create a canvas to get the image data
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // Set canvas size to the image size
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    // Draw the image onto the canvas at the correct position
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    // Get the pixel data at the mouse position
    var pixel = ctx.getImageData(x - imageElement.offsetLeft, y - imageElement.offsetTop, 1, 1).data;
    
    // Find the closest color name
    let closestColor = '';
    let minDistance = Infinity;
    let closestRgb = [0, 0, 0];

    colorNames.forEach(color => {
        let distance = colorDistance(pixel, color.rgb);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = color.name;
            closestRgb = color.rgb;
        }
    });

    // Update the color display text with the closest color name
    var colorDisplay = document.getElementById('color-display');
    colorDisplay.textContent = closestColor;  // Display the color name under the mouse
    colorDisplay.style.left = x + 10 + 'px';  // Position the text to the right of the mouse
    colorDisplay.style.top = y + 10 + 'px';  // Position the text just below the mouse
    
    // Change the text color to match the detected color
    colorDisplay.style.color = `rgb(${closestRgb[0]}, ${closestRgb[1]}, ${closestRgb[2]})`;
});

// Add a global variable to track whether color recognition is active or not
let isColorRecognitionActive = false;

// Function to toggle the color recognition on or off
function toggleColorRecognition() {
    isColorRecognitionActive = !isColorRecognitionActive; // Toggle the state
    const colorDisplay = document.getElementById('color-display');
    if (isColorRecognitionActive) {
        colorDisplay.style.display = 'block'; // Show color display when active
    } else {
        colorDisplay.style.display = 'none';  // Hide color display when inactive
    }
}

// Listen for the "C" key press to toggle color recognition
document.addEventListener('keydown', function(event) {
    if (event.key === 'c' || event.key === 'C') {
        toggleColorRecognition(); // Toggle the color recognition on 'C' key press
    }
});

// Modify the mousemove event listener to only track color when recognition is active
document.addEventListener('mousemove', function(event) {
    if (!isColorRecognitionActive) return; // If recognition is off, do nothing

    var imageElement = document.getElementById('rightImage');
    var x = event.pageX;
    var y = event.pageY;

    // Create a canvas to get the image data
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // Set canvas size to the image size
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    // Draw the image onto the canvas at the correct position
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    // Get the pixel data at the mouse position
    var pixel = ctx.getImageData(x - imageElement.offsetLeft, y - imageElement.offsetTop, 1, 1).data;
    
    // Find the closest color name
    let closestColor = '';
    let minDistance = Infinity;
    let closestRgb = [0, 0, 0];

    colorNames.forEach(color => {
        let distance = colorDistance(pixel, color.rgb);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = color.name;
            closestRgb = color.rgb;
        }
    });

    // Update the color display text with the closest color name
    var colorDisplay = document.getElementById('color-display');
    colorDisplay.textContent = closestColor;  // Display the color name under the mouse
    colorDisplay.style.left = x + 10 + 'px';  // Position the text to the right of the mouse
    colorDisplay.style.top = y + 10 + 'px';  // Position the text just below the mouse
    
    // Change the text color to match the detected color
    colorDisplay.style.color = `rgb(${closestRgb[0]}, ${closestRgb[1]}, ${closestRgb[2]})`;
});


