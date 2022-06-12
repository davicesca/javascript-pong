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
const ENEMY_SPEED = 5;
const ENEMY_REACTION_TIME = 30;
let enemyScore = 0;

// Ball Variables
let ballX = 50;
let ballSpeedX = 5;
let ballY = 50;
let ballSpeedY = 2.5;

/* CORE FUNCTIONS */
export function load() {
    canvas = document.querySelector('.game-canvas');
    canvasContext = canvas.getContext('2d');
    canvas.addEventListener('mousedown', handleMouseClick);
    canvas.addEventListener('mousemove', (e) => {
        const MOUSE_POS = calculateMousePos(e);
        playerY = MOUSE_POS.y - PADDLE_HEIGHT/2;
    });
}

export function update() {
    if(gameMode === 0 || gameMode === 2) {
        return;
    }
    ballMovement();
    enemyMovement();
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

    drawNet();

    // Player Paddle
    colorRect(0, playerY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    // AI/Enemy Paddle
    colorRect(canvas.width - PADDLE_THICKNESS, enemyY, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    
    // Ball
    colorCircle(ballX, ballY, 10, 'white');
}

/* GAMEPLAY FUNCTIONS */

function enemyMovement() {
    if(enemyY+PADDLE_HEIGHT/2 < ballY-ENEMY_REACTION_TIME) {
        enemyY += ENEMY_SPEED;
    } else if(enemyY+PADDLE_HEIGHT/2 > ballY+ENEMY_REACTION_TIME) {
        enemyY -= ENEMY_SPEED;
    }
}

/* All code related with ball movement  */
function ballMovement() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX > canvas.width) {
        ballSpeedX *= -1;
        if(sideCollision(enemyY)) {
            playerScore++;
        }
    }
    else if(ballX < 0) {
        ballSpeedX *= -1;
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
    if(ballY+10 >= paddleY && ballY-10 <= paddleY+PADDLE_HEIGHT) {
        const DELTA_Y = ballY - (paddleY + PADDLE_HEIGHT/2);
        ballSpeedY = DELTA_Y * 0.2;
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

function drawNet() {
    for(let i = 30; i < canvas.height-20; i += 40) {
        colorRect(canvas.width/2-1, i, 2, 20, 'white');   
    }
}

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

/* Gets mouse position on canvas */
/* WARNING: Requires an event listener */
function calculateMousePos(e) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = e.clientX - rect.left - root.scrollLeft;
    let mouseY = e.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}
