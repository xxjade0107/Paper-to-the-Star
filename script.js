const player = document.getElementById("player");
const scoreText = document.getElementById("scoretext");
const timeText = document.getElementById("timetext");
const game = document.getElementById("game");

let playerX = 180;
let score = 0;
let time = 100;

/* =====================
   장애물 관련 변수
===================== */
let obstaclePerSpawn = 1;
let obstacleSpeed = 3;
const maxSpeed = 19;

let spawnInterval = 1200;
let spawnTimer = null;

/* =====================
   플레이어 이동
===================== */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && playerX > 0) {
    playerX -= 20;
  }
  if (e.key === "ArrowRight" && playerX < 360) {
    playerX += 20;
  }
  player.style.left = playerX + "px";
});

/* =====================
   장애물 생성
===================== */
function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.className = "obstacle";

  let x = Math.random() * 360;
  let y = -30;

  obstacle.style.left = x + "px";
  obstacle.style.top = y + "px";

  game.appendChild(obstacle);

  const fall = setInterval(() => {
  y += obstacleSpeed;
  obstacle.style.top = y + "px";

  // 충돌 체크
  if (checkCollision(player, obstacle)) {
    clearInterval(fall);
    alert("Game Over!\nScore: " + score);
    location.reload();
    return;
  }

  if (y > 600) {
    clearInterval(fall);
    obstacle.remove();
    score++;
    scoreText.innerText = "Score: " + score;
  }
}, 16);

}

/* =====================
   장애물 생성 관리
===================== */
function startSpawning() {
  spawnTimer = setInterval(() => {
    for (let i = 0; i < obstaclePerSpawn; i++) {
      createObstacle();
    }
  }, spawnInterval);
}


function increaseDifficulty() {
  if (spawnInterval > 500) {
    spawnInterval -= 100;
    clearInterval(spawnTimer);
    startSpawning();
  }

  if (obstacleSpeed < maxSpeed) {
    obstacleSpeed += 0.3;
  }

  if (obstaclesPerSpawn < 4) {
  obstaclePerSpawn++;
}

}

function checkCollision(player, obstacle) {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  return !(
    playerRect.top > obstacleRect.bottom ||
    playerRect.bottom < obstacleRect.top ||
    playerRect.left > obstacleRect.right ||
    playerRect.right < obstacleRect.left
  );
}


/* =====================
   게임 타이머
===================== */
setInterval(() => {
  time--;
  timeText.innerText = "Time: " + time;

  if (time <= 0) {
    alert("Game Over!\nScore: " + score);
    location.reload();
  }
}, 1000);

/* =====================
   게임 시작
===================== */
startSpawning();
setInterval(increaseDifficulty, 5000);
