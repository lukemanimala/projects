const vocabulary = [
    {
        verb: "Llorar",
        translation: "to cry",
        presente: [
            { conjugation: "Lloro", definition: "I cry" },
            { conjugation: "Lloras", definition: "You cry (informal)" },
            { conjugation: "Llora", definition: "He/She cries" },
            { conjugation: "Lloramos", definition: "We cry" },
            { conjugation: "Lloráis", definition: "You all cry (informal, Spain)" },
            { conjugation: "Lloran", definition: "They/You all cry (formal)" }
        ],
        preterito: [
            { conjugation: "Lloré", definition: "I cried" },
            { conjugation: "Lloraste", definition: "You cried (informal)" },
            { conjugation: "Lloró", definition: "He/She cried" },
            { conjugation: "Lloramos", definition: "We cried" },
            { conjugation: "Llorasteis", definition: "You all cried (informal, Spain)" },
            { conjugation: "Lloraron", definition: "They/You all cried (formal)" }
        ]
    }
    // Add more vocabulary as needed
];

let currentTab = "infinitivo";
let currentIndex = 0;
let flipped = false;

const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');
const card = document.getElementById('card');

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function displayCard() {
    flipped = false;
    const word = getRandomItem(vocabulary);

    if (currentTab === "infinitivo") {
        card.textContent = Math.random() < 0.5 ? word.verb : word.translation;
        card.dataset.translation = Math.random() < 0.5 ? word.translation : word.verb;
    } else {
        const tense = currentTab === "presente" ? word.presente : word.preterito;
        const conjugation = getRandomItem(tense);
        card.textContent = Math.random() < 0.5 ? conjugation.conjugation : conjugation.definition;
        card.dataset.translation = Math.random() < 0.5 ? conjugation.definition : conjugation.conjugation;
    }
}

card.addEventListener('click', () => {
    if (!flipped) {
        card.textContent = card.dataset.translation;
        card.classList.add('clicked');
        flipped = true;
    } else {
        displayCard();
        card.classList.remove('clicked');
    }
});

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(tab.dataset.target).classList.add('active');

        currentTab = tab.dataset.target;
        displayCard();
    });
});

displayCard();
