let score = 0;
let timeLeft = 30;
let timerId;

const animalCategories = {
    farm: [
        { name: 'Cat', sound: 'sounds/cat.mp3' },
        { name: 'Dog', sound: 'sounds/dog.mp3' },
        { name: 'Cow', sound: 'sounds/cow.mp3' },
        { name: 'Sheep', sound: 'sounds/sheep.mp3' }
    ],
    wild: [
        { name: 'Lion', sound: 'sounds/lion.mp3' },
        { name: 'Elephant', sound: 'sounds/elephant.mp3' },
        { name: 'Monkey', sound: 'sounds/monkey.mp3' },
        { name: 'Tiger', sound: 'sounds/tiger.mp3' }
    ],
    sea: [
        { name: 'Dolphin', sound: 'sounds/dolphin.mp3' },
        { name: 'Shark', sound: 'sounds/shark.mp3' },
        { name: 'Whale', sound: 'sounds/whale.mp3' },
        { name: 'Octopus', sound: 'sounds/octopus.mp3' }
    ]
};

const animalSoundsContainer = document.getElementById('animal-sounds');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const feedbackDisplay = document.getElementById('feedback');
const categoryButtons = document.querySelectorAll('.category-button');

let selectedCategory;

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (selectedCategory) {
            resetGame();
        }
        selectedCategory = button.dataset.category;
        startButton.disabled = false;
        button.disabled = true;
    });
});

function resetGame() {
    clearInterval(timerId);
    score = 0;
    timeLeft = 30;

    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    feedbackDisplay.textContent = '';
    animalSoundsContainer.innerHTML = '';
}

function startGame() {
    startButton.disabled = true;
    timerId = setInterval(updateTimer, 1000);

    playAnimalSound();
}

function updateTimer() {
    timeLeft--;

    if (timeLeft <= 0) {
        clearInterval(timerId);
        alert(`Game over! Your score is ${score}`);
        resetGame();
        categoryButtons.forEach(button => button.disabled = false);
        return;
    }

    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
}

function playAnimalSound() {
    const animals = animalCategories[selectedCategory];
    const randomIndex = Math.floor(Math.random() * animals.length);

    const selectedAnimal = animals[randomIndex];
    const audio = new Audio(selectedAnimal.sound);
    audio.play();
    createAnimalButton(selectedAnimal.name);
}

function createAnimalButton(correctAnimal) {
    animalSoundsContainer.innerHTML = '';
    const animals = animalCategories[selectedCategory];

    animals.forEach(animal => {
        const button = document.createElement('button');
        button.classList.add('animal-button');
        button.textContent = animal.name;

        button.addEventListener('click', () =>
            handleButtonClick(animal.name, correctAnimal));
        animalSoundsContainer.appendChild(button);
    });
}

function handleButtonClick(selectedAnimal, correctAnimal) {
    if (selectedAnimal === correctAnimal) {
        score++;
        feedbackDisplay.textContent = "Correct!";
        scoreDisplay.textContent = `Score: ${score}`;
        setTimeout(playAnimalSound, 1000);
    } else {
        feedbackDisplay.textContent = 'Try Again';
    }
}

startButton.addEventListener('click', startGame);
