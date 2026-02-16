const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");
const restartBtn = document.getElementById("restart");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
const GROUND_HEIGHT = 92;

const bird = {
  x: 120,
  y: GAME_HEIGHT * 0.4,
  radius: 16,
  velocityY: 0,
  gravity: 0.36,
  jump: -6.8,
};

const state = {
  running: true,
  score: 0,
  bestScore: Number(localStorage.getItem("flappy-best-score") || 0),
  pipes: [],
  frame: 0,
  pipeGap: 150,
  pipeWidth: 72,
  pipeSpacing: 135,
  speed: 2.2,
};

bestScoreEl.textContent = state.bestScore;

function resetGame() {
  state.running = true;
  state.score = 0;
  state.pipes = [];
  state.frame = 0;

  bird.y = GAME_HEIGHT * 0.4;
  bird.velocityY = 0;

  scoreEl.textContent = "0";
}

function flap() {
  if (!state.running) {
    resetGame();
  }
  bird.velocityY = bird.jump;
}

function createPipe() {
  const minTop = 40;
  const maxTop = GAME_HEIGHT - GROUND_HEIGHT - state.pipeGap - 40;
  const topHeight = minTop + Math.random() * (maxTop - minTop);

  state.pipes.push({
    x: GAME_WIDTH,
    topHeight,
    scored: false,
  });
}

function update() {
  if (!state.running) return;

  state.frame += 1;

  bird.velocityY += bird.gravity;
  bird.y += bird.velocityY;

  if (state.frame % state.pipeSpacing === 0) {
    createPipe();
  }

  state.pipes.forEach((pipe) => {
    pipe.x -= state.speed;

    const withinPipeX =
      bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + state.pipeWidth;

    const hitTop = bird.y - bird.radius < pipe.topHeight;
    const hitBottom = bird.y + bird.radius > pipe.topHeight + state.pipeGap;

    if (withinPipeX && (hitTop || hitBottom)) {
      endGame();
    }

    if (!pipe.scored && pipe.x + state.pipeWidth < bird.x) {
      pipe.scored = true;
      state.score += 1;
      scoreEl.textContent = state.score;

      if (state.score > state.bestScore) {
        state.bestScore = state.score;
        bestScoreEl.textContent = state.bestScore;
        localStorage.setItem("flappy-best-score", String(state.bestScore));
      }
    }
  });

  state.pipes = state.pipes.filter((pipe) => pipe.x + state.pipeWidth > -10);

  if (bird.y + bird.radius > GAME_HEIGHT - GROUND_HEIGHT || bird.y - bird.radius < 0) {
    endGame();
  }
}

function endGame() {
  state.running = false;
}

function drawBackground() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = "#72c9f7";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT - GROUND_HEIGHT);

  ctx.fillStyle = "#7ec85d";
  ctx.fillRect(0, GAME_HEIGHT - GROUND_HEIGHT, GAME_WIDTH, GROUND_HEIGHT);

  for (let x = 0; x < GAME_WIDTH; x += 32) {
    ctx.fillStyle = x % 64 === 0 ? "#85cf64" : "#77bd57";
    ctx.fillRect(x, GAME_HEIGHT - GROUND_HEIGHT + 8, 32, 20);
  }
}

function drawPipes() {
  ctx.fillStyle = "#37a84c";
  ctx.strokeStyle = "#256f32";
  ctx.lineWidth = 3;

  state.pipes.forEach((pipe) => {
    const bottomY = pipe.topHeight + state.pipeGap;

    ctx.fillRect(pipe.x, 0, state.pipeWidth, pipe.topHeight);
    ctx.strokeRect(pipe.x, 0, state.pipeWidth, pipe.topHeight);

    ctx.fillRect(pipe.x - 6, pipe.topHeight - 18, state.pipeWidth + 12, 18);
    ctx.strokeRect(pipe.x - 6, pipe.topHeight - 18, state.pipeWidth + 12, 18);

    ctx.fillRect(pipe.x, bottomY, state.pipeWidth, GAME_HEIGHT - GROUND_HEIGHT - bottomY);
    ctx.strokeRect(pipe.x, bottomY, state.pipeWidth, GAME_HEIGHT - GROUND_HEIGHT - bottomY);

    ctx.fillRect(pipe.x - 6, bottomY, state.pipeWidth + 12, 18);
    ctx.strokeRect(pipe.x - 6, bottomY, state.pipeWidth + 12, 18);
  });
}

function drawBird() {
  ctx.save();
  ctx.translate(bird.x, bird.y);
  const tilt = Math.max(-0.55, Math.min(0.65, bird.velocityY / 9));
  ctx.rotate(tilt);

  ctx.fillStyle = "#ffd54d";
  ctx.strokeStyle = "#c99820";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(0, 0, bird.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f7931a";
  ctx.beginPath();
  ctx.moveTo(bird.radius - 2, -2);
  ctx.lineTo(bird.radius + 14, 2);
  ctx.lineTo(bird.radius - 2, 8);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(4, -6, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#262626";
  ctx.beginPath();
  ctx.arc(5.5, -6, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawOverlay() {
  if (state.running) return;

  ctx.fillStyle = "rgb(0 0 0 / 45%)";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.font = "700 42px system-ui";
  ctx.fillText("Game Over", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 18);
  ctx.font = "500 20px system-ui";
  ctx.fillText("Press Space / Click to Restart", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 24);
}

function loop() {
  update();
  drawBackground();
  drawPipes();
  drawBird();
  drawOverlay();

  requestAnimationFrame(loop);
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    flap();
  }
});

canvas.addEventListener("pointerdown", flap);
restartBtn.addEventListener("click", resetGame);

loop();
