const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rules = document.querySelector('.rules');
const btnRules = document.querySelector('.btn--rules');
const btnClose = document.querySelector('.btn--close');

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  dx: 4,
  dy: -4,
  speed: 4,
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  width: 80,
  height: 10,
  speed: 8,
  dx: 0,
  visible: true,
};

const brick = {
  x: 45,
  y: 60,
  width: 70,
  height: 20,
  padding: 10,
  visible: true,
};

const BRICK_COLUMN = 9;
const BRICK_ROW = 5;
const bricks = [];
let score = 0;

const drawBall = function () {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};

const drawRect = function (rect) {
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.fillStyle = rect.visible ? '#0095dd' : 'transparent';
  ctx.fill();
  ctx.closePath();
};

const drawScore = function () {
  ctx.font = '2rem Arial';
  ctx.fillText('Score: ' + score, canvas.width - 100, 30);
};
drawScore();

const createbricks = function () {
  for (let i = 0; i < BRICK_COLUMN; i++) {
    for (let j = 0; j < BRICK_ROW; j++) {
      const x = brick.x + (brick.width + brick.padding) * i;
      const y = brick.y + (brick.height + brick.padding) * j;
      const obj = { ...brick, x, y };
      bricks.push(obj);
    }
  }
};
createbricks();

const showAllBricks = function () {
  bricks.forEach(brick => (brick.visible = true));
};

const updateBricks = function () {
  bricks.forEach(brick => {
    drawRect(brick);
    if (
      brick.visible &&
      ball.x + ball.size > brick.x &&
      ball.x - ball.size < brick.x + brick.width &&
      ball.y + ball.size > brick.y &&
      ball.y - ball.size < brick.y + brick.height
    ) {
      ball.dy *= -1;
      brick.visible = false;
      score++;
    }

    if (score % (BRICK_COLUMN * BRICK_ROW) === 0) showAllBricks();
  });
};

const draw = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawRect(paddle);
  drawScore();
};

const moveBall = function () {
  if (ball.y - ball.size <= 0 || ball.y + ball.size >= canvas.height)
    ball.dy = -ball.dy;

  if (ball.x + ball.size >= canvas.width || ball.x - ball.size <= 0)
    ball.dx = -ball.dx;

  if (
    ball.x + ball.size > paddle.x &&
    ball.x - ball.size < paddle.x + paddle.width &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  if (ball.y + ball.size >= canvas.height) {
    showAllBricks();
    score = 0;
  }

  ball.y += ball.dy;
  ball.x += ball.dx;
};

const movePaddle = function () {
  if (paddle.x + paddle.width > canvas.width)
    paddle.x = canvas.width - paddle.width;
  if (paddle.x < 0) paddle.x = 0;
  paddle.x += paddle.dx;
};

const update = function () {
  draw();
  moveBall();
  movePaddle();
  updateBricks();
  requestAnimationFrame(update);
};
update();

window.addEventListener('keydown', function (e) {
  const key = e.key;
  if (key === 'right' || key === 'ArrowRight' || key === 'd')
    paddle.dx = paddle.speed;
  if (key === 'left' || key === 'ArrowLeft' || key === 'a')
    paddle.dx = -paddle.speed;
});

window.addEventListener('keyup', () => (paddle.dx = 0));

btnRules.addEventListener('click', () => rules.classList.add('show'));
btnClose.addEventListener('click', () => rules.classList.remove('show'));
