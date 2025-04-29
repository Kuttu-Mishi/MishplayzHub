const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
const player = {
  x: canvas.width / 2,
  y: canvas.height - 130,
  width: 70,
  height: 120,
  color: "red",
  speed: 7
};

// Bullets
const bullets = [];
const bulletSpeed = 10;
const bulletSize = { width: 10, height: 30 };

// Enemies
const enemies = [];
const enemySpeed = 1;
const enemySize = { width: 80, height: 30 };
let enemySpawnTimer = 0;

// Game state
let score = 0;
let enemiesEscaped = 0;
let gameOver = false;

// Controls
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (gameOver && e.key.toLowerCase() === "w") restartGame();
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x + player.width / 2, player.y + player.height, player.width / 2, Math.PI, 0);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.stroke();
}

function drawBullet(bullet) {
  ctx.fillStyle = "cyan";
  ctx.fillRect(bullet.x, bullet.y, bulletSize.width, bulletSize.height);
  ctx.strokeRect(bullet.x, bullet.y, bulletSize.width, bulletSize.height);
}

function drawEnemy(enemy) {
  ctx.fillStyle = "yellow";
  ctx.fillRect(enemy.x, enemy.y, enemySize.width, enemySize.height);
  ctx.strokeRect(enemy.x, enemy.y, enemySize.width, enemySize.height);
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 20, 40);
}

function drawHealthBar() {
  const barWidth = 300;
  const fillWidth = (enemiesEscaped / 10) * barWidth;

  ctx.fillStyle = "green";
  ctx.fillRect(20, 90, barWidth, 25);
  ctx.fillStyle = "red";
  ctx.fillRect(20, 90, fillWidth, 25);
  ctx.strokeRect(20, 90, barWidth, 25);

  ctx.fillStyle = "black";
  ctx.fillText(`Enemies Escaped: ${enemiesEscaped}/10`, 20, 80);
}

function shoot() {
  bullets.push({
    x: player.x + player.width / 2 - bulletSize.width / 2,
    y: player.y
  });
}

function spawnEnemy() {
  const x = Math.random() * (canvas.width - enemySize.width);
  enemies.push({ x: x, y: -enemySize.height });
}

function checkCollision(a, b, aSize, bSize) {
  return (
    a.x < b.x + bSize.width &&
    a.x + aSize.width > b.x &&
    a.y < b.y + bSize.height &&
    a.y + aSize.height > b.y
  );
}

function update() {
  if (gameOver) return;

  // Player movement
  if (keys["a"] && player.x > 0) player.x -= player.speed;
  if (keys["d"] && player.x < canvas.width - player.width) player.x += player.speed;

  // Shooting
  if (keys["w"] && Date.now() - (shoot.lastTime || 0) > 200) {
    shoot();
    shoot.lastTime = Date.now();
  }

  // Move bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= bulletSpeed;
    if (bullets[i].y < 0) bullets.splice(i, 1);
  }

  // Move enemies
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].y += enemySpeed;

    // Enemy and player collision
    if (checkCollision(enemies[i], player, enemySize, { width: player.width, height: player.height })) {
      gameOver = true;
    }

    // Enemy reached bottom
    if (enemies[i].y > canvas.height) {
      enemies.splice(i, 1);
      enemiesEscaped++;
      if (enemiesEscaped >= 10) gameOver = true;
    }
  }

  // Bullet collisions
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      if (checkCollision(bullets[i], enemies[j], bulletSize, enemySize)) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        score++;
        spawnEnemy();
        break;
      }
    }
  }

  // Spawn new enemy every ~1 second
  enemySpawnTimer++;
  if (enemySpawnTimer >= 100) {
    spawnEnemy();
    enemySpawnTimer = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  bullets.forEach(drawBullet);
  enemies.forEach(drawEnemy);
  drawScore();
  drawHealthBar();

  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "48px Arial";
    ctx.fillText("Game Over! Press W to Restart", canvas.width / 2 - 300, canvas.height / 2);
  }
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
  player.x = canvas.width / 2;
}

loop();
