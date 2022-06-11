// Canvas Variables
let canvas;
let canvasContext;

// Game Mode (0 = Menu; 1 = Game; 2 = Win Screen) 
let gameMode = 0;

/* CORE FUNCTIONS */
export function load() {
    canvas = document.querySelector('.game-canvas');
    canvasContext = canvas.getContext('2d');
    canvas.addEventListener('mousedown', handleMouseClick);
}

export function update() {

}

export function draw() {
    // Game Display
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    if(gameMode === 0) { // Main Menu
        const playTxt = 'CLICK ON SCREEN TO PLAY!';
        colorText(playTxt, '32px', 
        (canvas.width-canvasContext.measureText(playTxt).width)/2,
        canvas.height/2, 
        'white');
        return;
    }
    else if(gameMode === 2) { // Win Screen
        return;
    }

    // Game

}

/* GAME FUNCTIONS */

/* Draws text on screen */
function colorText(text, size, x, y, color) {
    canvasContext.font= `${size} Arial`;
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

function handleMouseClick() {
    if(gameMode === 0) {
        gameMode = 1;
    }
}