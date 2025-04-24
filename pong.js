const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const paddleWidth = 10, paddleHeight = 100;
const ballSize = 10;
let upArrowPressed = false, downArrowPressed = false, wKeyPressed = false, sKeyPressed = false;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2, rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2, ballSpeedX = 3, ballSpeedY = 3;
let leftScore = 0, rightScore = 0;

// Event listeners for controls
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") downArrowPressed = true;
    if (e.key === "ArrowDown") upArrowPressed = true;
    if (e.key === "w" || e.key === "W") wKeyPressed = true;
    if (e.key === "s" || e.key === "S") sKeyPressed = true;
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp") downArrowPressed = false;
    if (e.key === "ArrowDown") upArrowPressed = false;
    if (e.key === "w" || e.key === "W") wKeyPressed = false;
    if (e.key === "s" || e.key === "S") sKeyPressed = false;
});

// Draw the paddles, ball, and score
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw paddles
    ctx.fillStyle = "white";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight); // Left paddle
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight); // Right paddle

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    // Draw score
    ctx.font = "30px Arial";
    ctx.fillText("Left: " + leftScore, canvas.width / 4, 50);
    ctx.fillText("Right: " + rightScore, 3 * canvas.width / 4, 50);
}

// Move paddles
function movePaddles() {
    if (upArrowPressed && rightPaddleY > 0) rightPaddleY -= 5;
    if (downArrowPressed && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += 5;
    if (wKeyPressed && leftPaddleY > 0) leftPaddleY -= 5;
    if (sKeyPressed && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += 5;
}

// Move the ball and check for collisions
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY; // Bounce
    }

    // Ball collision with paddles
    if (ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX; // Bounce
        leftScore++; // Left player scores
    }

    if (ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX; // Bounce
        rightScore++; // Right player scores
    }

    // Ball out of bounds (left side)
    if (ballX + ballSize < 0) {
        rightScore++; // Right player scores
        resetBall();
    }

    // Ball out of bounds (right side)
    if (ballX - ballSize > canvas.width) {
        leftScore++; // Left player scores
        resetBall();
    }
}

// Reset ball to center after scoring
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1); // Random vertical direction
}

// Game loop
function gameLoop() {
    movePaddles();
    moveBall();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop(); // Start the game loop
