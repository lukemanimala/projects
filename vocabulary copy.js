import vocabulary from './vocabulary.js'; // Import the vocabulary data

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

// Utility Function: Update the card content to show a question
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

    // Set card to question state
    card.style.backgroundColor = 'white'; // Question background
    card.style.color = 'black'; // Question font color
    card.dataset.state = 'question'; // Track current state
}

// Card Interaction: Toggle between question and answer
card.addEventListener('click', () => {
    if (card.dataset.state === 'question') {
        // Show the answer
        card.textContent = card.dataset.translation;
        card.style.backgroundColor = '#C34E04'; // Answer background
        card.style.color = 'white'; // Answer font color
        card.dataset.state = 'answer'; // Update state
    } else {
        // Show a new question
        updateCard();
    }
});

// Tab Switching
tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        activeTab = tab.dataset.tab;
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        updateCard(); // Update card content based on the new tab
    });
});

// Initialize the app
updateCard();
