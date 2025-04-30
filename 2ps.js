function start2ps() {
const canvas = document.getElementById("2psCanvas");
const ctx = canvas.getContext("2d");

const p1 = {
    x: canvas.width / 2 - 35,
    y: canvas.height - 130,
    width: 70,
    height: 30,
    color: "red",
    speed: 7
}

const p2 = {
    x: canvas.width / 2 - 35,
    y: canvas.height - 130,
    width: 70,
    height: 30,
    color: "blue",
    speed: 7
}

const bullets = [];
const bulletSpeed = 10;
const bulletSize = { width: 10, height: 30 };

function drawp1() {
    ctx.fillStyle = p1.color;
    ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
    ctx.strokeRect(p1.x, p1.y, p1.width, p1.height);
}

function drawp2() {
    ctx.fillStyle = p2.color;
    ctx.fillRect(p2.x, p2.y, p2.width, p2.height);
    ctx.strokeRect(p2.x, p2.y, p2.width, p2.height);
}

function drawBullet(bullet) {
    ctx.fillStyle = "cyan";
    ctx.fillRect(bullet.x, bullet.y, bulletSize.width, bulletSize.height);
    ctx.strokeRect(bullet.x, bullet.y, bulletSize.width, bulletSize.height);

    function drawBullets() {
        bullets.forEach(drawBullet);
    }

    function updateBullets() {
        bullets.forEach(bullet => {
            bullet.y -= bulletSpeed;
        });
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawp1();
        drawp2();
        drawBullets();
        updateBullets();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
    requestAnimationFrame(gameLoop);
}
window.start2ps = start2ps;
}
