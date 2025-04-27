const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const keys = {};

const player1 = {
  x: 50,
  y: canvas.height / 2 - 60,
  width: 20,
  height: 120,
  speed: 8,
  dy: 0,
  score: 0
};

const player2 = {
  x: canvas.width - 70,
  y: canvas.height / 2 - 60,
  width: 20,
  height: 120,
  speed: 8,
  dy: 0,
  score: 0
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 12,
  speed: 5,
  dx: 5,
  dy: 3
};

let ballColor = '#ecf0f1';
let gameOver = false;
let winner = '';

window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawArc(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function drawNet() {
  ctx.fillStyle = '#555';
  const netWidth = 4, netHeight = 20;
  for (let i = 0; i < canvas.height; i += netHeight * 2) {
    ctx.fillRect(canvas.width / 2 - netWidth / 2, i, netWidth, netHeight);
  }
}

function drawScores() {
  ctx.fillStyle = "#000";
  ctx.font = "48px Arial";
  ctx.fillText(player1.score, canvas.width / 4, 50);
  ctx.fillText(player2.score, canvas.width * 3/4, 50);
}

function drawGameOver() {
  ctx.fillStyle = "black";
  ctx.font = "80px Arial";
  ctx.fillText(`${winner} Wins!`, canvas.width/2 - 200, canvas.height/2);
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 5;
  let angle = Math.random() * Math.PI / 4 - Math.PI / 8; // random -22.5 to +22.5 degrees
  let direction = (Math.random() > 0.5 ? 1 : -1);
  ball.dx = direction * ball.speed * Math.cos(angle);
  ball.dy = ball.speed * Math.sin(angle);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNet();
  drawRect(player1.x, player1.y, player1.width, player1.height, '#e74c3c');
  drawRect(player2.x, player2.y, player2.width, player2.height, '#3498db');
  drawArc(ball.x, ball.y, ball.radius, ballColor);
  drawScores();
  if (gameOver) {
    drawGameOver();
  }
}

function update() {
  if (gameOver) return;

  // Player 1 controls
  if (keys['w']) player1.dy = -player1.speed;
  else if (keys['s']) player1.dy = player1.speed;
  else player1.dy = 0;

  // Player 2 controls
  if (keys['ArrowUp']) player2.dy = -player2.speed;
  else if (keys['ArrowDown']) player2.dy = player2.speed;
  else player2.dy = 0;

  player1.y += player1.dy;
  player2.y += player2.dy;

  // Clamp paddles inside canvas
  player1.y = Math.max(Math.min(player1.y, canvas.height - player1.height), 0);
  player2.y = Math.max(Math.min(player2.y, canvas.height - player2.height), 0);

  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball collision with top/bottom
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy = -ball.dy;
  }

  function collide(p) {
    return ball.x - ball.radius < p.x + p.width &&
           ball.x + ball.radius > p.x &&
           ball.y - ball.radius < p.y + p.height &&
           ball.y + ball.radius > p.y;
  }

  if (collide(player1) && ball.dx < 0) {
    ball.dx = -ball.dx;
    ball.speed += 0.5;
    ballColor = '#' + Math.floor(Math.random()*16777215).toString(16); // random color
    ball.dx = (ball.dx > 0 ? 1 : -1) * ball.speed;
  } else if (collide(player2) && ball.dx > 0) {
    ball.dx = -ball.dx;
    ball.speed += 0.5;
    ballColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    ball.dx = (ball.dx > 0 ? 1 : -1) * ball.speed;
  }

  if (ball.x - ball.radius < 0) {
    player2.score++;
    if (player2.score >= 5) {
      gameOver = true;
      winner = "Player 2";
    }
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    player1.score++;
    if (player1.score >= 5) {
      gameOver = true;
      winner = "Player 1";
    }
    resetBall();
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
