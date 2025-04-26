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

  const keys = {};

  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    if (gameOver && e.key.toLowerCase() === "w") restartGame();
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

  drawp1()
  drawp2()