const canvas = document.getElementById("frame")
const ctx = canvas.getContext("2d")

//Players
const p1 = {
    x: canvas.width / 2,
    y: canvas.height - 130,
    width: 70,
    height: 120,
    color: "red",
    speed: 10
  };

  const p2 = {
    x: canvas.width / 2,
    y: canvas.height - 130,
    width: 70,
    height: 120,
    color: "blue",
    speed: 10
  };

  const ball = {
    x: canvas.width / 2,
    y: canvas.height - 130,
    radius: 15,
    color: "white",
    speed: 7
  };

  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    if (gameOver && e.key.toLowerCase() === "w") restartGame();
  });
  
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  function drawp1() {
  ctx.beginPath();
  ctx.arc(player.x + player.width / 2, player.y + player.height, player.width / 2, Math.PI, 0);
  ctx.fillStyle = player.color;
  ctx.fill();
  ctx.stroke();
  }

ctx.fillStyle = "black";
ctx.fillRect(100, 100, 100, 100); // test box to see if drawing works

    drawp1()
  
