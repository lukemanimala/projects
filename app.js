import vocabulary from './vocabulary.js'; // Import the vocabulary data
import { infinitives } from './vocabulary.js'; // Import infinitive data

let activeTab = 'infinitives'; // Default tab set to 'infinitives'
let currentWord = null;
let currentConjugation = null;

// HTML Elements
const card = document.querySelector('#card');
const tabs = document.querySelectorAll('.tab');

// Utility Function: Get a random element from an array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Utility Function: Update the card content
function updateCard() {
    let word;

    if (activeTab === 'infinitives') {
        word = getRandomElement(infinitives);
        card.textContent = Math.random() > 0.5 ? word.spanish : word.english;
        card.dataset.translation =
            card.textContent === word.spanish ? word.english : word.spanish;
    } else if (activeTab === 'presente' || activeTab === 'preterito' || activeTab === 'futuro') {
        word = getRandomElement(vocabulary);
        currentWord = word;

        const conjugations = word[activeTab];
        currentConjugation = getRandomElement(conjugations);

        // Randomize whether to show Spanish or English first
        if (Math.random() > 0.5) {
            card.textContent = currentConjugation.conjugation;
            card.dataset.translation = currentConjugation.definition;
        } else {
            card.textContent = currentConjugation.definition;
            card.dataset.translation = currentConjugation.conjugation;
        }
    } else {
        // Fallback to infinitive
        word = getRandomElement(infinitives);
        card.textContent = word.verb;
        card.dataset.translation = word.translation;
    }

    // Reset the card style for a new question
    card.classList.remove('clicked');
    card.style.backgroundColor = ''; // Default background
    card.style.color = ''; // Default font color
}

// Tab Switching
tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        activeTab = tab.dataset.tab;
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        updateCard(); // Update card content based on the new tab
    });
});

// Card Interaction: Show the translation on click
card.addEventListener('click', () => {
    if (card.textContent === card.dataset.translation) {
        // If already translated, show a new word
        updateCard();
    } else {
        // Show the translation
        card.textContent = card.dataset.translation;
        card.classList.add('clicked'); // Apply clicked style
    }
});

// Initialize the app by simulating a click on the "infinitives" tab
document.querySelector(".tab[data-tab='infinitives']").click();
