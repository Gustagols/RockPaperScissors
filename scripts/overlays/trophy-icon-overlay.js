<<<<<<< HEAD
import { trophyBtn } from "../dom-elements.js";
import { record } from "../main.js";

const trophyCard = document.querySelector('.right-section');

let isOverlayed = false;
let overlayContentElements = [];

function createOverlayContent() {
    overlayContentElements.forEach(el => el.remove());

    const title = document.createElement('h2');
    title.textContent = 'Record';
    title.style.cssText = `
        color: white;
        font-family: monospace, sans-serif;
        margin-top: 150px;
        margin-bottom: 40px;
    `;

    const history = [
        `You won!  🥳 (${record.youWon})`,
        `You tied. 😐 (${record.youTied})`,
        `You lost. 😞 (${record.youLost})`
    ];

    const messages = history.map(rule => {
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

    const resetRecord = document.createElement('button');
    resetRecord.textContent = 'Reset Record';
    resetRecord.style.cssText = `
        margin-top: 60px;
        height: 30px;
        width: 120px;
        color: white;
        background-color: rgb(22, 20, 20);
        border: 1px solid black;
        cursor: pointer;
    `;

    resetRecord.addEventListener('click', () => {
        if (record.youWon !== 0 || record.youTied !== 0 || record.youLost !== 0) {
            const userConfirmed = confirm('Are you sure?');
            if (userConfirmed) {
                record.youWon = 0;
                record.youTied = 0;
                record.youLost = 0;
                localStorage.setItem('record', JSON.stringify(record));
                createOverlayContent();
            }
        } else {
            alert('The record is empty.');
        }
    });

    overlayContentElements = [title, ...messages, resetRecord];
    overlayContentElements.forEach(el => trophyCard.appendChild(el));
}

trophyBtn.addEventListener('click', () => {
    isOverlayed = !isOverlayed;
    trophyCard.classList.toggle('overlayed', isOverlayed);
    trophyBtn.style.cssText = isOverlayed ? `transform: rotate(180deg); transition: transform 0.3s ease;` : `transform: rotate(0deg); transition: transform 0.3s ease;`;

    isOverlayed ? createOverlayContent() : overlayContentElements.forEach(el => el.remove());
});


function trophyOverlay() {
    isOverlayed = !isOverlayed;
    trophyCard.classList.toggle('overlayed', isOverlayed);
    trophyBtn.style.cssText = isOverlayed ? `transform: rotate(180deg); transition: transform 0.3s ease;` : `transform: rotate(0deg); transition: transform 0.3s ease;`;

    isOverlayed ? createOverlayContent() : overlayContentElements.forEach(el => el.remove());
}

export function showTrophyOverlay() {
    trophyOverlay();
}
=======
import { trophyBtn } from "../dom-elements.js";
import { record } from "../main.js";

const trophyCard = document.querySelector('.right-section');

let isOverlayed = false;
let overlayContentElements = [];

function createOverlayContent() {
    overlayContentElements.forEach(el => el.remove());

    const title = document.createElement('h2');
    title.textContent = 'Record';
    title.style.cssText = `
        color: white;
        font-family: monospace, sans-serif;
        margin-top: 150px;
        margin-bottom: 40px;
    `;

    const history = [
        `You won!  🥳 (${record.youWon})`,
        `You tied. 😐 (${record.youTied})`,
        `You lost. 😞 (${record.youLost})`
    ];

    const messages = history.map(rule => {
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

    const resetRecord = document.createElement('button');
    resetRecord.textContent = 'Reset Record';
    resetRecord.style.cssText = `
        margin-top: 60px;
        height: 30px;
        width: 120px;
        color: white;
        background-color: rgb(22, 20, 20);
        border: 1px solid black;
        cursor: pointer;
    `;

    resetRecord.addEventListener('click', () => {
        if (record.youWon !== 0 || record.youTied !== 0 || record.youLost !== 0) {
            const userConfirmed = confirm('Are you sure?');
            if (userConfirmed) {
                record.youWon = 0;
                record.youTied = 0;
                record.youLost = 0;
                localStorage.setItem('record', JSON.stringify(record));
                createOverlayContent();
            }
        } else {
            alert('The record is empty.');
        }
    });

    overlayContentElements = [title, ...messages, resetRecord];
    overlayContentElements.forEach(el => trophyCard.appendChild(el));
}

trophyBtn.addEventListener('click', () => {
    isOverlayed = !isOverlayed;
    trophyCard.classList.toggle('overlayed', isOverlayed);
    trophyBtn.style.cssText = isOverlayed ? `transform: rotate(180deg); transition: transform 0.3s ease;` : `transform: rotate(0deg); transition: transform 0.3s ease;`;

    isOverlayed ? createOverlayContent() : overlayContentElements.forEach(el => el.remove());
});
>>>>>>> ce214bb86034bb54883c37aa4436ad44b87ee789
