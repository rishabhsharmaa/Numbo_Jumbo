const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 50, y: 300, width: 30, height: 30, dx: 0, dy: 0, gravity: 0.5, jumpStrength: -10, isJumping: false };
let platformHeight = 20;
let platforms = [];
let currentQuestion = 0;
let score = 0;
let timer = 30; // seconds
let gameActive = true; // To track if the game is active

let keys = { left: false, right: false };

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let answer, wrongAnswer1, wrongAnswer2;

    switch (operation) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;
        case '*':
            answer = num1 * num2;
            break;
        case '/':
            // To avoid decimals, adjust numbers for integer division
            answer = Math.floor(num1 / num2);
            break;
    }

    // Generate wrong answers that are reasonably close to the correct answer
    wrongAnswer1 = answer + Math.floor(Math.random() * 3) + 1;
    wrongAnswer2 = answer - Math.floor(Math.random() * 3) - 1;

    return {
        question: `${num1} ${operation} ${num2} =`,
        options: [answer, wrongAnswer1, wrongAnswer2].sort(() => 0.5 - Math.random()),
        correct: answer
    };
}

let question = generateQuestion();

function startTimer() {
    const timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
        } else {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function initPlatforms() {
    platforms = [];
    
    let platformY = canvas.height - platformHeight - 60;
    
    let startX = 150;
    question.options.forEach((option, index) => {
        platforms.push({ 
            x: startX + index * 200, 
            y: platformY,
            width: 100, 
            height: platformHeight, 
            answer: option 
        });
    });
}

function drawPlayer() {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y + player.height / 2, player.width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2 - 5, player.y + player.height / 2 - 5, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2 + 5, player.y + player.height / 2 - 5, 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.fillStyle = 'green';
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        
        ctx.fillStyle = 'black';
        ctx.font = '20px Comic Sans MS';
        ctx.fillText(platform.answer, platform.x + 30, platform.y - 10);
    });
}

function drawBackground() {
    let skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#b6e1fa');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(80, 80, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(300, 100, 30, 0, Math.PI * 2);
    ctx.arc(330, 90, 30, 0, Math.PI * 2);
    ctx.arc(360, 100, 30, 0, Math.PI * 2);
    ctx.fill();
}

function drawQuestion() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Comic Sans MS';
    ctx.fillText(question.question, 20, 30);
    ctx.fillText("Score: " + score, 20, 60);
    ctx.fillText("Time: " + timer + "s", canvas.width - 100, 30);
}

function updatePlayer() {
    player.dy += player.gravity;
    player.y += player.dy;
    
    if (keys.right) player.dx = 3;
    else if (keys.left) player.dx = -3;
    else player.dx = 0;

    player.x += player.dx;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.isJumping = false;
    }

    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y < platform.y + platform.height &&
            player.dy > 0
        ) {
            player.y = platform.y - player.height;
            player.isJumping = false;
            
            if (platform.answer === question.correct) {
                score++;
                question = generateQuestion();
                initPlatforms();
            }
        }
    });
}

function endGame() {
    gameActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '30px Comic Sans MS';
    ctx.fillText("Time's Up!", canvas.width / 2 - 80, canvas.height / 2 - 30);
    ctx.fillText("Final Score: " + score, canvas.width / 2 - 100, canvas.height / 2 + 10);

    const restartButton = document.createElement('button');
    restartButton.innerText = "Play Again!";
    restartButton.style.position = "absolute";
    restartButton.style.top = canvas.offsetTop + canvas.height / 2 + 50 + 'px';
    restartButton.style.left = canvas.offsetLeft + canvas.width / 2 - 75 + 'px';
    restartButton.style.padding = "15px 30px";
    restartButton.style.fontSize = "20px";
    restartButton.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
    restartButton.style.backgroundColor = "#FFDD59";
    restartButton.style.color = "#444";
    restartButton.style.border = "3px solid #F39C12";
    restartButton.style.borderRadius = "20px";
    restartButton.style.cursor = "pointer";
    restartButton.style.boxShadow = "3px 3px 10px rgba(0, 0, 0, 0.2)";
    restartButton.style.transition = "transform 0.2s";
    restartButton.addEventListener('mouseover', () => {
        restartButton.style.transform = "scale(1.1)";
    });
    restartButton.addEventListener('mouseout', () => {
        restartButton.style.transform = "scale(1)";
    });
    restartButton.addEventListener('click', () => {
        document.body.removeChild(restartButton);
        
        restartGame();
    });


    document.body.appendChild(restartButton);

    restartButton.addEventListener('click', () => {
        document.body.removeChild(restartButton);
        restartGame();
    });
}

function restartGame() {
    score = 0;
    timer = 30;
    gameActive = true;
    resetGame();
    startTimer();
    gameLoop();
}
function gameLoop() {
    if (gameActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawQuestion();
        drawPlayer();
        drawPlatforms();
        updatePlayer();

        requestAnimationFrame(gameLoop);
    }
}

function jump() {
    if (!player.isJumping) {
        player.dy = player.jumpStrength;
        player.isJumping = true;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === ' ') jump();
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') keys.right = false;
    if (e.key === 'ArrowLeft') keys.left = false;
});

initPlatforms();
startTimer();
gameLoop();