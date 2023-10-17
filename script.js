const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-button');
const gameContainer = document.querySelector('.game-container');
let gameActive = false; 
let score = 0;

let paddleX = 0;
let ballY = 0;



startButton.addEventListener('click', () => {
    if (!gameActive) {
        startGame();
    }
});



function startGame() {
    gameActive = true;
    score = 0;
    scoreElement.innerText = 'Score: 0';
    resetBall();
    moveBall();
    startButton.style.display = 'none';
}

gameContainer.addEventListener('mousemove', (event) => {
    if (gameActive) {
        const containerRect = gameContainer.getBoundingClientRect();
        paddleX = event.clientX - containerRect.left - paddle.clientWidth / 2;
        movePaddle();
    }
});




function movePaddle() {
    paddle.style.left = `${paddleX}px`;
}

function moveBall() {
    if (gameActive) {
        ballY += 2;
        ball.style.top = `${ballY}px`;

        if (ballY > gameContainer.clientHeight - ball.clientHeight) {
            if (ballX > paddleX && ballX < paddleX + paddle.clientWidth) {
               
                resetBall();
                increaseScore();
                
            } else {
                
                endGame();
            }
        }

        if (ballY < gameContainer.clientHeight) {
            requestAnimationFrame(moveBall);
        }
    }
}

function resetBall() {
    ballY = 0;
    ball.style.top = '0';
    ballX = Math.random() * (gameContainer.clientWidth - ball.clientWidth);
    ball.style.left = `${ballX}px`;
}

function increaseScore() {
    score += 10;
    scoreElement.innerText = `Score: ${score}`;
}


function loadTopScores() {
    const topScores = JSON.parse(localStorage.getItem('topScores')) || [];
    const scoreList = document.getElementById('score-list');

    scoreList.innerHTML = '';

    topScores.slice(0, 3).forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `#${index + 1}: ${score}`;
        scoreList.appendChild(listItem);
    });
}


function saveScore(score) {
    const topScores = JSON.parse(localStorage.getItem('topScores')) || [];
    topScores.push(score);
    topScores.sort((a, b) => b - a); 
    localStorage.setItem('topScores', JSON.stringify(topScores));
    loadTopScores();
}


loadTopScores();



function endGame() {
    gameActive = false;
    alert(`Game Over! Your score: ${score}`);
    startButton.style.display = 'block';

    if (score > 0) {
        const topScores = JSON.parse(localStorage.getItem('topScores')) || [];
        topScores.push(score);
        topScores.sort((a, b) => b - a); 
        localStorage.setItem('topScores', JSON.stringify(topScores));

        if (score === topScores[0]) {
            alert(`You made it to the top score with a score of ${score}!`);
        }
        loadTopScores();
    }
}






let ballX = Math.random() * (gameContainer.clientWidth - ball.clientWidth);
ball.style.left = `${ballX}px`;















function initializeJitsiMeet() {
    const domain = 'meet.jit.si';
    const options = {
        roomName: 'SampleAppLazyExplosionsPrayStill', 
        parentNode: document.querySelector('#jitsi-iframe-container'),
    };

   
    const api = new JitsiMeetExternalAPI(domain, options);

   
    api.addEventListener('videoConferenceLeft', () => {
        
    });
}


initializeJitsiMeet();

