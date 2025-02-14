const bird = document.getElementById("bird");
const gameContainer = document.querySelector(".game-container");
const obstacleTop = document.getElementById("obstacle-top");
const obstacleBottom = document.getElementById("obstacle-bottom");

let birdY = 250;
let gravity = 2;
let gameSpeed = 2;
let isGameOver = false;

// Make the bird fall
function applyGravity() {
    if (!isGameOver) {
        birdY += gravity;
        bird.style.top = birdY + "px";
        checkCollision();
        requestAnimationFrame(applyGravity);
    }
}

// Make the bird jump
function jump() {
    if (!isGameOver) {
        birdY -= 50;
        bird.style.top = birdY + "px";
    }
}

// Move obstacles
function moveObstacles() {
    if (!isGameOver) {
        let obstacleTopX = parseFloat(obstacleTop.style.left || 400);
        let obstacleBottomX = parseFloat(obstacleBottom.style.left || 400);

        obstacleTopX -= gameSpeed;
        obstacleBottomX -= gameSpeed;

        if (obstacleTopX < -60) {
            obstacleTopX = 400;
            obstacleBottomX = 400;
            randomizeObstacleHeight();
        }

        obstacleTop.style.left = obstacleTopX + "px";
        obstacleBottom.style.left = obstacleBottomX + "px";

        requestAnimationFrame(moveObstacles);
    }
}

// Randomize obstacle height
function randomizeObstacleHeight() {
    const gap = 150;
    const topHeight = Math.random() * (gameContainer.clientHeight - gap);
    obstacleTop.style.height = topHeight + "px";
    obstacleBottom.style.height = gameContainer.clientHeight - topHeight - gap + "px";
}

// Check for collisions
function checkCollision() {
    const birdRect = bird.getBoundingClientRect();
    const topRect = obstacleTop.getBoundingClientRect();
    const bottomRect = obstacleBottom.getBoundingClientRect();

    if (
        birdRect.bottom > gameContainer.clientHeight ||
        birdRect.top < 0 ||
        (birdRect.right > topRect.left && birdRect.left < topRect.right && birdRect.bottom > topRect.bottom) ||
        (birdRect.right > bottomRect.left && birdRect.left < bottomRect.right && birdRect.top < bottomRect.top)
    ) {
        isGameOver = true;
        alert("Game Over!");
    }
}

// Event listener for jumping
document.addEventListener("keydown", jump);

// Initialize game
randomizeObstacleHeight();
applyGravity();
moveObstacles();