import { questionBtn } from "../dom-elements.js";

const questionCard = document.querySelector('.left-section');

let isOverlayed = false;
let overlayContentElements = [];

function createOverlayContent() {
    // Limpa os elementos anteriores, se existirem
    overlayContentElements.forEach(el => el.remove());

    // Título
    const title = document.createElement('h2');
    title.textContent = 'ROCK PAPER SCISSORS';
    title.style.cssText = `
        color: white;
        font-family: monospace, sans-serif;
        margin-top: 150px;
        margin-bottom: 40px;
    `;

    // Regras
    const rules = [
        '5 WINS: You won! 🥳',
        '5 TIES: You tied. 😐',
        '5 LOSSES: You Lost. 😞'
    ];

    const messages = rules.map(rule => {
        const message = document.createElement('p');
        message.textContent = rule;
        message.style.cssText = `
            color: white;
            font-size: min(40px, 100%);
            font-family: monospace, sans-serif;
            margin-bottom: 10px;
        `;
        return message;
    });

    // Instructions
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'carousel-container';

    const carouselContent = document.createElement('div');
    carouselContent.className = 'carousel-content';
    carouselContent.innerHTML = `
        ${`Rock beats Scissors (✊ x ✌️) Paper beats Rock (✋ x ✊) Scissors beats Paper (✌️ x ✋)`}
        ${`Rock beats Scissors (✊ x ✌️) Paper beats Rock (✋ x ✊) Scissors beats Paper (✌️ x ✋)`}
    `;
    carouselContainer.appendChild(carouselContent);
    carouselContainer.style.cssText = `
        color: white;
        font-family: monospace, sans-serif;
        font-size: 14px;
        margin-top: 80px;
        overflow: hidden;
        white-space: nowrap;
        width: 60%; 
        margin-left: auto;
        margin-right: auto;
    `;

    // Author
    const authorContainer = document.createElement('div');
    authorContainer.innerHTML = `
        <a style="color: white;" href="https://linktr.ee/gustagols?utm_source=linktree_profile_share&ltsid=b4e327d8-13c4-4eb9-a419-9f7a60634064" target="_blank">
        <h3 class="h3" style="font-family: monospace; color: white;">Made by Gustavo Malta</h3>
        </a>`;
    authorContainer.style.cssText = `
        margin-top: 60px;
        `;

    overlayContentElements = [title, ...messages, carouselContainer, authorContainer];
    overlayContentElements.forEach(el => questionCard.appendChild(el));
}

// Evento de clique
questionBtn.addEventListener('click', () => {
    isOverlayed = !isOverlayed;
    questionCard.classList.toggle('overlayed', isOverlayed);
    questionBtn.style.cssText = isOverlayed ? `transform: rotate(180deg); transition: transform 0.3s ease;` : `transform: rotate(0deg); transition: transform 0.3s ease;`;

    isOverlayed ? createOverlayContent() : overlayContentElements.forEach(el => el.remove());
});

function questionOverlay() {
    isOverlayed = !isOverlayed;
    questionCard.classList.toggle('overlayed', isOverlayed);
    questionBtn.style.cssText = isOverlayed ? `transform: rotate(180deg); transition: transform 0.3s ease;` : `transform: rotate(0deg); transition: transform 0.3s ease;`;

    isOverlayed ? createOverlayContent() : overlayContentElements.forEach(el => el.remove());
}

export function showQuestionOverlay() {
    questionOverlay();
}
