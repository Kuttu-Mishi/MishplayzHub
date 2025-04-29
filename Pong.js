
function startGame() {
const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const keys = {};

const p1 = {
  x: 5,
  y: 300,
  width: 10,
  height: 50,
  color: "red",
  speed: 10,
  score: 0
};

const p2 = {
  x: 1195,
  y: 300,
  width: 10,
  height: 50,
  color: "blue",
  speed: 10,
  score: 0
};

const ball = {
  x: 600,
  y: 300,
  radius: 15,
  color: "white",
  speed: 7
};

// Key listeners
window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Drawing functions
function drawp1() {
  ctx.beginPath();
  ctx.rect(p1.x, p1.y, p1.width, p1.height);
  ctx.fillStyle = p1.color;
  ctx.fill();
  ctx.stroke();
}

function drawp2() {
  ctx.beginPath();
  ctx.rect(p2.x, p2.y, p2.width, p2.height);
  ctx.fillStyle = p2.color;
  ctx.fill();
  ctx.stroke();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.stroke();
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("player 1: " + p1.score, 10, 20);
  ctx.fillText("player 2: " + p2.score, canvas.width - 100, 20);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (keys["w"] && p1.y > 0) p1.y -= p1.speed;
  if (keys["s"] && p1.y < canvas.height - p1.height) p1.y += p1.speed;

  if (keys["ArrowUp"] && p2.y > 0) p2.y -= p2.speed;
  if (keys["ArrowDown"] && p2.y < canvas.height - p2.height) p2.y += p2.speed;


  drawp1();
  drawp2();
  drawBall();
  drawScore();

  requestAnimationFrame(loop);
}
loop();
}
