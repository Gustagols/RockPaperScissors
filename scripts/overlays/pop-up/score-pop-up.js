import { score, record, resetScore } from '../../main.js';
import { questionBtn, trophyBtn, resetBtn, autoplayBtn } from '../../dom-elements.js';

let isOverlayed = false;
let overlayContentElements = [];

function createOverlayContent() {
    overlayContentElements.forEach(el => el.remove());
    const resultCard = document.createElement('div');
    resultCard.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.975);
        border-radius: 10px;
        width: min(370px, 80%);
        height: min(160px, 50%);
        padding: 8px;
        margin-top: 50px;
        text-align: center;
        z-index: 1000; 
        opacity: 0;
    `;
    resultCard.classList.add("result-card");

    let resultMessageText = '';
    if (score.wins === 5) resultMessageText = 'You Won! 🥳';
    else if (score.ties === 5) resultMessageText = 'You tied. 😐';
    else if (score.losses === 5) resultMessageText = 'You lost. 😞';

    const message = document.createElement('h3');
    message.textContent = resultMessageText;
    message.style.cssText = `
        color: white;
        font-family: monospace, sans-serif;
        margin-top: 40px;
    `;

    const loadingText = document.createElement('div');
    loadingText.classList.add('loading-text');
    loadingText.innerHTML = `Saving record<span class="dots"><span>.</span><span>.</span><span>.</span></span>`;

    loadingText.style.cssText = `
    color: white;
    font-family: monospace, sans-serif;
    font-size: 14px;
    margin-top: 10px;
    `;

    const style = document.createElement('style');
    style.textContent = `
    .dots span {
        display: inline-block;
        opacity: 0;
        animation: blink 1s infinite;
    }
    .dots span:nth-child(1) { animation-delay: 0s; }
    .dots span:nth-child(2) { animation-delay: 0.3s; }
    .dots span:nth-child(3) { animation-delay: 0.6s; }

    @keyframes blink {
        0%, 20% { opacity: 0; }
        50%, 100% { opacity: 1; }
    }
    `;


    const historyText = document.createElement('div');
    historyText.textContent = `
        🥳 (${record.youWon})
        😐 (${record.youTied})
        😞 (${record.youLost})
        `;

    historyText.style.cssText = `
        position: absolute;
        color: white;
        bottom: 20px;
        left: 10px; right: 10px;
        font: normal 14px monospace;
        display: flex;
        justify-content: space-around;
        z-index: 1003;
    `;

    // Adiciona elementos ao cartão
    resultCard.appendChild(message);
    document.head.appendChild(style);
    resultCard.appendChild(loadingText);
    resultCard.appendChild(historyText);
    // Adiciona o cartão ao body
    document.body.appendChild(resultCard);
    overlayContentElements = [resultCard];

    setTimeout(() => {
        resultCard.classList.add("fade-out");
        resultCard.addEventListener("animationend", () => {
            setTimeout(() => {
                isOverlayed = false;
                overlayContentElements.forEach(el => el.remove());
                resetScore();
                questionBtn.disabled = false;
                trophyBtn.disabled = false;
                resetBtn.disabled = false;
                autoplayBtn.disabled = false;
                questionBtn.style.cursor = 'pointer';
                trophyBtn.style.cursor = 'pointer';
                resetBtn.style.cursor = 'pointer';
                autoplayBtn.style.cursor = 'pointer';
            }, 300);
        }, { once: true });
    }, 1800);
}

function showPopup() {
    if (score.wins === 5 || score.ties === 5 || score.losses === 5) {
        if (!isOverlayed) {
            isOverlayed = true;
            createOverlayContent();
            questionBtn.disabled = true;
            trophyBtn.disabled = true;
            resetBtn.disabled = true;
            autoplayBtn.disabled = true;
            questionBtn.style.cursor = 'not-allowed';
            trophyBtn.style.cursor = 'not-allowed';
            resetBtn.style.cursor = 'not-allowed';
            autoplayBtn.style.cursor = 'not-allowed';
        }
    }
}

export function checkScore() {
    showPopup();
}

