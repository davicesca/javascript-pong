// Canvas Variables
let canvas;
let canvasContext;

// Game Variables 
let gameMode;

/* CORE FUNCTIONS */
export function load() {
    canvas = document.querySelector('.game-canvas');
    canvasContext = canvas.getContext('2d');
}

export function update() {

}

export function draw() {
    // Game Display
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    colorText('Oi! Tudo bem?', 100, 100, 'white');

}

/* GAME FUNCTIONS */

/* Draws text on screen */
function colorText(text, x, y, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillText(text, x, y);
}

/* Draws a rectangle on screen */
function colorRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

/* Draws a circle on screen */
function colorCircle(x, y, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}