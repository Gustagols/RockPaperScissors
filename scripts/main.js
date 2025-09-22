import { emojiElement, scoreElement } from './dom-elements.js'; // divs
import { questionBtn, trophyBtn, rockBtn, paperBtn, scissorsBtn, resetBtn, autoplayBtn } from './dom-elements.js'; // buttons
import { checkScore } from './overlays/pop-up/score-pop-up.js'; // function

// used at trophy-icon-overlay.js and score-pop-up.js
export { score, record, rockBtn, paperBtn, scissorsBtn, resetScore };

let score = { wins: 0, ties: 0, losses: 0 };
let record = JSON.parse(localStorage.getItem('record')) || { youWon: 0, youTied: 0, youLost: 0 };

function updateScore() {
    scoreElement.innerText = `Wins: ${score.wins} || Ties: ${score.ties} || Losses: ${score.losses}`;
}

updateScore();

function computerPick() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) return 'rock';
    if (randomNumber < 2 / 3) return 'paper';
    return 'scissors';
}

function gameRecord() {
    if (score.wins === 5) {
        record.youWon++;
        localStorage.setItem('record', JSON.stringify(record));
        updateScore();
        setTimeout(() => {
            checkScore();
        }, 300);
    }
    if (score.ties === 5) {
        record.youTied++;
        localStorage.setItem('record', JSON.stringify(record));
        updateScore();
        setTimeout(() => {
            checkScore();
        }, 300);
    }
    if (score.losses === 5) {
        record.youLost++;
        localStorage.setItem('record', JSON.stringify(record));
        updateScore();
        setTimeout(() => {
            checkScore();
        }, 300);
    }
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;
}

function playGame(playerMove) {
    const computerMove = computerPick();

    emojiElement.innerHTML = `
    <img class="result-img" src="icons/${playerMove}-emoji.png"> x
    <img class="result-img" src="icons/${computerMove}-emoji.png">`;

    let result = 'tie';
    if (playerMove === computerMove) {
        score.ties++;
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        score.wins++;
        result = 'win';
    } else {
        score.losses++;
        result = 'lose';
    }

    // Aplica o efeito de piscar ao botão clicado
    const button = document.querySelector(`.${playerMove}-button`);
    button.classList.remove('win-flash', 'lose-flash');
    if (result === 'win') {
        button.classList.add('win-flash');
    } else if (result === 'lose') {
        button.classList.add('lose-flash');
    }
    setTimeout(() => button.classList.remove('win-flash', 'lose-flash'), 400);

    if (score.wins === 5 || score.ties === 5 || score.losses === 5) {
        gameRecord();
        setTimeout(() => {
            if (isAutoPlaying) {
                clearInterval(intervalId);
                autoplayBtn.disabled = false;
                autoplayBtn.innerText = 'Auto-play';
                isAutoPlaying = false;
                resetBtn.disabled = false;
                questionBtn.style.cursor = 'pointer';
                trophyBtn.style.cursor = 'pointer';
                rockBtn.style.cursor = 'pointer';
                paperBtn.style.cursor = 'pointer';
                scissorsBtn.style.cursor = 'pointer';
                resetBtn.style.cursor = 'pointer';
            }
        }, 500);
    } else {
        updateScore();
    }
}

resetBtn.addEventListener('click', () => { resetScore(); });

function resetScore() {
    emojiElement.innerHTML = '';
    score.wins = 0;
    score.ties = 0;
    score.losses = 0;
    questionBtn.disabled = false;
    trophyBtn.disabled = false;
    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;
    updateScore();
}

let isAutoPlaying = false;
let intervalId;

autoplayBtn.addEventListener('click', () => {
    if (!isAutoPlaying) {
        questionBtn.disabled = true;
        trophyBtn.disabled = true;
        rockBtn.disabled = true;
        paperBtn.disabled = true;
        scissorsBtn.disabled = true;
        resetBtn.disabled = true;
        questionBtn.style.cursor = 'not-allowed';
        trophyBtn.style.cursor = 'not-allowed';
        rockBtn.style.cursor = 'not-allowed';
        paperBtn.style.cursor = 'not-allowed';
        scissorsBtn.style.cursor = 'not-allowed';
        resetBtn.style.cursor = 'not-allowed';
        autoplayBtn.innerText = 'Stop Auto-play';
        intervalId = setInterval(() => {
            const playerMove = computerPick();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        questionBtn.disabled = false;
        trophyBtn.disabled = false;
        rockBtn.disabled = false;
        paperBtn.disabled = false;
        scissorsBtn.disabled = false;
        resetBtn.disabled = false;
        questionBtn.style.cursor = 'pointer';
        trophyBtn.style.cursor = 'pointer';
        rockBtn.style.cursor = 'pointer';
        paperBtn.style.cursor = 'pointer';
        scissorsBtn.style.cursor = 'pointer';
        resetBtn.style.cursor = 'pointer';
        autoplayBtn.innerText = 'Auto-play';
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
});

rockBtn.addEventListener('click', () => playGame('rock'));
paperBtn.addEventListener('click', () => playGame('paper'));
scissorsBtn.addEventListener('click', () => playGame('scissors'));

