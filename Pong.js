function startGame() {
  const canvas = document.getElementById("pongCanvas");
  const ctx = canvas.getContext("2d");

  const keys = {};
  let gameOver = false;

  const p1 = {
    x: 10,
    y: 300,
    width: 20,
    height: 70,
    color: "red",
    speed: 10,
    score: 0
  };

  const p2 = {
    x: 1150,
    y: 300,
    width: 20,
    height: 70,
    color: "blue",
    speed: 10,
    score: 0
  };

  const ball = {
    x: 600,
    y: 300,
    radius: 15,
    color: "black",
    xspeed: 5,
    yspeed: 5,
  };

  function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.xspeed = (Math.random() > 0.5 ? 1 : -1) * 7;
    ball.yspeed = (Math.random() > 0.5 ? 1 : -1) * 7;
  }

  function restartGame() {
    p1.score = 0;
    p2.score = 0;
    gameOver = false;
    resetBall();
  }

  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;

    // Optional: restart on Enter key
    if (e.key === "Enter" && gameOver) {
      restartGame();
    }
  });

  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

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
    ctx.fillText("p1 score: " + p1.score, 10, 20);
    ctx.fillText("p2 score: " + p2.score, canvas.width - 150, 20);
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
      if (keys["w"] && p1.y > 0) p1.y -= p1.speed;
      if (keys["s"] && p1.y < canvas.height - p1.height) p1.y += p1.speed;

      if (keys["p"] && p2.y > 0) p2.y -= p2.speed;
      if (keys["l"] && p2.y < canvas.height - p2.height) p2.y += p2.speed;

      ball.x += ball.xspeed;
      ball.y += ball.yspeed;

      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.yspeed = -ball.yspeed;
      }

      if (
        ball.x - ball.radius < p1.x + p1.width &&
        ball.y > p1.y &&
        ball.y < p1.y + p1.height
      ) {
        ball.xspeed = -ball.xspeed;
        ball.x = p1.x + p1.width + ball.radius;
      }

      if (
        ball.x + ball.radius > p2.x &&
        ball.y > p2.y &&
        ball.y < p2.y + p2.height
      ) {
        ball.xspeed = -ball.xspeed;
        ball.x = p2.x - ball.radius;
      }

      if (ball.x - ball.radius < 0) {
        p2.score++;
        resetBall();
      }

      if (ball.x + ball.radius > canvas.width) {
        p1.score++;
        resetBall();
      }

      // Game Over check
      if (p1.score >= 5 || p2.score >= 5) {
        gameOver = true;
        setTimeout(() => {
          alert("Game Over! Press Enter to restart.");
        }, 100);
      }
    }

    drawp1();
    drawp2();
    drawBall();
    drawScore();

    requestAnimationFrame(loop);
  }

  resetBall();
  loop();
}
