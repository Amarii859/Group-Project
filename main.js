const ball = document.getElementById("ball");
const goalkeeper = document.getElementById("goalkeeper");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");

let score = 0;
let isMoving = false;
let ballLeft = 145;

// Lëviz topin me tastiera ← →
document.addEventListener("keydown", (e) => {
  if (isMoving) return;

  if (e.key === "ArrowLeft" && ballLeft > 5) {
    ballLeft -= 10;
  } else if (e.key === "ArrowRight" && ballLeft < 285) {
    ballLeft += 10;
  } else if (e.code === "Space") {
    shoot();
  }
  ball.style.left = ballLeft + "px";
});

// Klik për gjuajtje
ball.addEventListener("click", shoot);

function shoot() {
  if (isMoving) return;
  isMoving = true;
  message.textContent = "";

  let topPos = ball.offsetTop;

  const shootInterval = setInterval(() => {
    topPos -= 12;
    ball.style.top = topPos + "px";

    const keeperLeft = goalkeeper.offsetLeft;
    const keeperRight = keeperLeft + goalkeeper.offsetWidth;
    const ballCenter = ball.offsetLeft + ball.offsetWidth / 2;

    if (topPos <= 85) {
      clearInterval(shootInterval);
      isMoving = false;

      if (ballCenter > keeperLeft && ballCenter < keeperRight) {
        message.textContent = "❌ Portieri e ndaloi!";
      } else {
        score++;
        scoreEl.textContent = score;
        message.textContent = "🥅 GOOOL!";
      }

      // Reset topi
      setTimeout(() => {
        ball.style.top = "";
        ballLeft = 145;
        ball.style.left = ballLeft + "px";
        message.textContent = "";
      }, 1000);
    }
  }, 30);
}
