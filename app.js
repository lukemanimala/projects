import vocabulary from './vocabulary.js'; // Import the vocabulary

let activeTab = 'presente'; // Default tab
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
    const word = getRandomElement(vocabulary);
    currentWord = word;

    if (activeTab === 'presente' || activeTab === 'preterito' || activeTab === 'futuro') {
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
        // Default to infinitive if the active tab is unrecognized
        card.textContent = word.verb;
        card.dataset.translation = word.translation;
    }
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
        card.style.backgroundColor = '#C34E04'; // Answer color
    }
});

// Initialize the app
updateCard();
