const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const gameContainer = document.querySelector('.game-container');

let jumping = false;
let score = 0; // Initialize the score variable

// Reference to the HTML element where you want to display the score
const scoreDisplay = document.getElementById('score-display');

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32 && !jumping) {
        jump();
    }
});

function jump() {
    jumping = true;
    let jumpHeight = 0;

    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 300) {
            clearInterval(jumpInterval);
            fall();
        } else {
            jumpHeight += 5;
            character.style.bottom = jumpHeight + 'px';
        }
    }, 20);
}

function fall() {
    const fallInterval = setInterval(() => {
        const characterBottom = parseInt(getComputedStyle(character).bottom);
        if (characterBottom > 0) {
            character.style.bottom = (characterBottom - 5) + 'px';
        } else {
            clearInterval(fallInterval);
            jumping = false;
        }
    }, 20);
}

function moveObstacle() {
    let obstacleRight = 0;

    const moveInterval = setInterval(() => {
        if (obstacleRight >= gameContainer.clientWidth) {
            clearInterval(moveInterval);
            obstacle.style.right = '0';
            moveObstacle();
        } else {
            obstacleRight += 5;
            obstacle.style.right = obstacleRight + 'px';
        }

        checkCollision();
    }, 20);
}

function checkCollision() {
    const characterRect = character.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        characterRect.bottom >= obstacleRect.top &&
        characterRect.left <= obstacleRect.right &&
        characterRect.right >= obstacleRect.left
    ) {
        gameOver();
    } else {
        // No collision, so increase the score
        score++;
        updateScoreDisplay();
    }
}

function updateScoreDisplay() {
    // Update the HTML element that displays the score
    scoreDisplay.innerText = `Score: ${score}`;
}

function gameOver() {
    alert('Game Over! Your score: ' + score);
    document.location.reload();
}

moveObstacle();
