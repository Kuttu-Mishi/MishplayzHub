<canvas id="gameCanvas" width="800" height="600"></canvas>
<script>
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
const player = {
  x: canvas.width / 2,
  y: canvas.height - 130,
  width: 70,
  height: 120,
  color: "red",
  speed: 7,
  health: 3
};

// Assets
const sounds = {
  shoot: new Audio("shoot.mp3"),
  hit: new Audio("hit.mp3"),
  gameover: new Audio("gameover.mp3")
};

// Bullets
const bullets = [];
const bulletSpeed = 10;
const bulletSize = { width: 10, height: 30 };

// Enemies
const enemies = [];
const enemySize = { width: 80, height: 30 };
let enemySpawnTimer = 0;

// Game state
let score = 0;
let enemiesEscaped = 0;
let gameOver = false;
let paused = false;
let gameStarted = false;

// Controls
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (!gameStarted && e.key.toLowerCase() === "w") {
    gameStarted = true;
    restartGame();
  }
  if (gameOver && e.key.toLowerCase() === "w") restartGame();
  if (e.key === "Escape") paused = !paused;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Touch controls for mobile
canvas.addEventListener("touchstart", (e) => {
  const x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
  if (x < player.x) keys["a"] = true;
  else if (x > player.x + player.width) keys["d"] = true;
  shoot();
});
canvas.addEventListener("touchend", () => {
  keys["a"] = false;
  keys["d"] = false;
});

// Drawing
function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x + player.width / 2, player.y + player.height, player.width / 2, Math.PI, 0);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.stroke();
}

function drawBullet(bullet) {
  ctx.fillStyle = "blue";
  ctx.fillRect(bullet.x, bullet.y, bulletSize.width, bulletSize.height);
}

function drawEnemy(enemy) {
  ctx.fillStyle = enemy.type === "fast" ? "orange" : "yellow";
  ctx.fillRect(enemy.x, enemy.y, enemySize.width, enemySize.height);
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 20, 40);
}

function drawHealthBar() {
  ctx.fillStyle = "black";
  ctx.fillText(`Health: ${player.health}`, 20, 70);
}

function drawStartScreen() {
  ctx.fillStyle = "black";
  ctx.font = "48px Arial";
  ctx.fillText("Press W to Start", canvas.width / 2 - 200, canvas.height / 2);
}

function drawPauseScreen() {
  ctx.fillStyle = "black";
  ctx.font = "36px Arial";
  ctx.fillText("Paused", canvas.width / 2 - 60, canvas.height / 2);
}

function drawGameOver() {
  ctx.fillStyle = "black";
  ctx.font = "48px Arial";
  ctx.fillText("Game Over! Press W to Restart", canvas.width / 2 - 300, canvas.height / 2);
}

function shoot() {
  sounds.shoot.currentTime = 0;
  sounds.shoot.play();
  bullets.push({
    x: player.x + player.width / 2 - bulletSize.width / 2,
    y: player.y
  });
}

function spawnEnemy() {
  const x = Math.random() * (canvas.width - enemySize.width);
  const type = Math.random() < 0.2 ? "fast" : "normal";
  enemies.push({ x, y: -30, type });
}

function checkCollision(a, b) {
  return (
    a.x < b.x + enemySize.width &&
    a.x + bulletSize.width > b.x &&
    a.y < b.y + enemySize.height &&
    a.y + bulletSize.height > b.y
  );
}

function update() {
  if (!gameStarted || gameOver || paused) return;

  if (keys["a"] && player.x > 0) player.x -= player.speed;
  if (keys["d"] && player.x < canvas.width - player.width) player.x += player.speed;

  if (keys["w"] && Date.now() - (shoot.lastTime || 0) > 300) {
    shoot();
    shoot.lastTime = Date.now();
  }

  bullets.forEach((b, i) => {
    b.y -= bulletSpeed;
    if (b.y < 0) bullets.splice(i, 1);
  });

  enemies.forEach((e, i) => {
    e.y += e.type === "fast" ? 2.5 : 1 + score * 0.01;

    // Hit player
    if (
      e.x < player.x + player.width &&
      e.x + enemySize.width > player.x &&
      e.y + enemySize.height > player.y
    ) {
      enemies.splice(i, 1);
      player.health--;
      if (player.health <= 0) {
        gameOver = true;
        sounds.gameover.play();
      }
    }

    // Reach bottom
    if (e.y > canvas.height) {
      enemies.splice(i, 1);
      enemiesEscaped++;
    }
  });

  bullets.forEach((b, i) => {
    enemies.forEach((e, j) => {
      if (checkCollision(b, e)) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        score++;
        sounds.hit.currentTime = 0;
        sounds.hit.play();
        spawnEnemy();
      }
    });
  });

  // Slow down spawn rate
  enemySpawnTimer++;
  if (enemySpawnTimer >= 80 - Math.min(score, 40)) {
    spawnEnemy();
    enemySpawnTimer = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameStarted) {
    drawStartScreen();
    return;
  }

  drawPlayer();
  bullets.forEach(drawBullet);
  enemies.forEach(drawEnemy);
  drawScore();
  drawHealthBar();

  if (paused) drawPauseScreen();
  if (gameOver) drawGameOver();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

function restartGame() {
  score = 0;
  bullets.length = 0;
  enemies.length = 0;
  enemiesEscaped = 0;
  gameOver = false;
  player.health = 3;
  player.x = canvas.width / 2;
  shoot.lastTime = 0;
}

loop();
</script>
