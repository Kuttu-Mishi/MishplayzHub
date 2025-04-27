const canvas = document.getElementById("frame");
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

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
  ball.speed = 5;
  ball.dy = 3 * (Math.random() > 0.5 ? 1 : -1);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNet();
  drawRect(player1.x, player1.y, player1.width, player1.height, '#e74c3c');
  drawRect(player2.x, player2.y, player2.width, player2.height, '#3498db');
  drawArc(ball.x, ball.y, ball.radius, '#ecf0f1');
}

function update() {
  if (keys['w']) player1.dy = -player1.speed;
  else if (keys['s']) player1.dy = player1.speed;
  else player1.dy = 0;

  if (keys['ArrowUp']) player2.dy = -player2.speed;
  else if (keys['ArrowDown']) player2.dy = player2.speed;
  else player2.dy = 0;

  player1.y += player1.dy;
  player2.y += player2.dy;

  player1.y = Math.max(Math.min(player1.y, canvas.height - player1.height), 0);
  player2.y = Math.max(Math.min(player2.y, canvas.height - player2.height), 0);

  ball.x += ball.dx;
  ball.y += ball.dy;

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
    ball.dx = (ball.dx > 0 ? 1 : -1) * ball.speed;
  } else if (collide(player2) && ball.dx > 0) {
    ball.dx = -ball.dx;
    ball.speed += 0.5;
    ball.dx = (ball.dx > 0 ? 1 : -1) * ball.speed;
  }

  if (ball.x - ball.radius < 0) {
    player2.score++;
    console.log(`Player 2 Score: ${player2.score}`);
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    player1.score++;
    console.log(`Player 1 Score: ${player1.score}`);
    resetBall();
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
