// Canvas Variables
let canvas;
let canvasContext;

// Game Mode (0 = Menu; 1 = Game; 2 = Win Screen) 
let gameMode = 0;

// Paddle Variables
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

// Player Variables
let playerY = 250;
let playerScore = 0;

// Enemy Variables
let enemyY = 250;
let enemyScore = 0;

// Ball Variables
let ballX = 50;
let ballSpeedX = 5;
let ballY = 50;
let ballSpeedY = 5;

/* CORE FUNCTIONS */
export function load() {
    canvas = document.querySelector('.game-canvas');
    canvasContext = canvas.getContext('2d');
    canvas.addEventListener('mousedown', handleMouseClick);
}

export function update() {
    if(gameMode === 0 || gameMode === 2) {
        return;
    }
    ballMovement();
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

    // Player Paddle
    colorRect(PADDLE_THICKNESS, playerY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    // AI/Enemy Paddle
    colorRect(canvas.width - PADDLE_THICKNESS*2, enemyY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    
    // Ball
    colorCircle(ballX, ballY, 10, 'white');
}

/* GAMEPLAY FUNCTIONS */

/* All code related with ball movement  */
function ballMovement() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX > canvas.width){
        // ballSpeedX *= -1;
        if(sideCollision(enemyY)) {
            playerScore++;
        }
    }
    else if(ballX < 0) {
        // ballSpeedX *= -1;
        if(sideCollision(playerY)) {
            enemyScore++;
        }
    }

    if(ballY > canvas.height || ballY < 0) {
        ballSpeedY *= -1;
    }
}

/* Verifies if ball collided with sides */
function sideCollision(paddleY) {
    if(ballY >= paddleY && ballY <= paddleY+PADDLE_HEIGHT) {
        ballSpeedX *= -1;
        return false;
    }
    ballReset();
    return true;
}

/* Reset ball's position to center */
function ballReset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

/* OTHER FUNCTIONS */

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
    if(gameMode === 0 || gameMode === 2) {
        gameMode = 1;
    }
}
