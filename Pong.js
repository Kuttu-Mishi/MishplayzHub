const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

const keys = {};

const p1 = {
  x: 5,
  y: 300,
  width: 0,
  height: 50,
  color: "red",
  speed: 10
};

const p2 = {
  x: 795,
  y: 300,
  width: 10,
  height: 50,
  color: "blue",
  speed: 10
};

const ball = {
  x: 400,
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

drawp1();
drawp2();


