const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const buttonContainer = document.getElementsByClassName('button-container');
const answerOneButton = document.getElementById('answer-1');
const answerTwoButton = document.getElementById('answer-2');
const answerThreeButton = document.getElementById('answer-3');
const answerFourButton = document.getElementById('answer-4');
const bodyElement = document.querySelector('body');
const buttonElements = document.getElementsByClassName('button');
const buttonsArray = Array.from(buttonElements);

let score;
let shuffledQuestions, shuffledAnswers, currentQuestionIndex;
let grade;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    resetBackgrounds();
    if (currentQuestionIndex == shuffledQuestions.length) {
        endGame();
    } else {
        loadQuestion(shuffledQuestions);
    }
});

function endGame() {
    grade = score / shuffledQuestions.length;
    buttonsArray.forEach(element => element.classList.add('hide'));
    let photoImg = document.createElement('img');

    if (grade == 1.0) {
        questionElement.innerText = "Wise, you are!";
        photoImg.setAttribute('src', "Yoda.jpeg");
        photoImg.classList.add('center');
    } else if (grade < 1.0 && grade >= 0.8){
        questionElement.innerText = "Well done!";
        photoImg.setAttribute('src', "ObiWan.jpeg");
        photoImg.classList.add('center');
    } else if (grade < 0.8 && grade > 0.5) {
        questionElement.innerText = "Much to learn, you still have";
        photoImg.setAttribute('src', "YodaAndLuke.jpeg");
        photoImg.classList.add('center');
    } else {
        questionElement.innerText = "Perhaps you should go back now and complete your training";
        photoImg.setAttribute('src', "LukeLosesHand.jpg");
        photoImg.classList.add('center');
    }
    
    questionContainerElement.appendChild(photoImg);
}

function startGame() {
    score = 0;
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 0;
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    loadQuestion(shuffledQuestions);
}

function loadQuestion(questions) {
    questionElement.innerText = questions[currentQuestionIndex].question;
    loadAnswers(shuffledQuestions);
    answerOneButton.addEventListener('click', checkAnswer);
    answerTwoButton.addEventListener('click', checkAnswer);
    answerThreeButton.addEventListener('click', checkAnswer);
    answerFourButton.addEventListener('click', checkAnswer);
}

function loadAnswers(questions) {
    shuffledAnswers = questions[currentQuestionIndex].answers.sort(() => Math.random() - 0.5);
    answerOneButton.innerText = shuffledAnswers[0].text;
    answerTwoButton.innerText = shuffledAnswers[1].text;
    answerThreeButton.innerText = shuffledAnswers[2].text;
    answerFourButton.innerText = shuffledAnswers[3].text;
    if (shuffledAnswers[0].correct) answerOneButton.dataset.correct = shuffledAnswers[0].correct;
    if (shuffledAnswers[1].correct) answerTwoButton.dataset.correct = shuffledAnswers[1].correct;
    if (shuffledAnswers[2].correct) answerThreeButton.dataset.correct = shuffledAnswers[2].correct;
    if (shuffledAnswers[3].correct) answerFourButton.dataset.correct = shuffledAnswers[3].correct;
}

function checkAnswer() {
    if (this.dataset.correct) {
        bodyElement.classList.add('correct');
        this.classList.add('correct');
        score++;
    } else {
        bodyElement.classList.add('wrong');
        this.classList.add('wrong');
    }
    nextButton.classList.remove('hide');
}

function resetBackgrounds() {
    bodyElement.classList.remove('correct');
    bodyElement.classList.remove('wrong');
    buttonsArray.forEach(element => element.classList.remove('correct'));
    buttonsArray.forEach(element => element.classList.remove('wrong'));
    buttonsArray.forEach(element => delete element.dataset.correct);
}

const questions = [
    {
        question: "Which planet is home to the force-sensitive Nightsisters?",
        answers: [
            {text: "Dathomir", correct: true},
            {text: "Tatooine", correct: false},
            {text: "Dantooine", correct: false},
            {text: "Ansion", correct: false}
        ]
    },
    {
        question: "Which title does the Black Sun leadership bestow on its senior lieutenants?",
        answers: [
            {text: "Mal'ary'ush", correct: false},
            {text: "Vigo", correct: true},
            {text: "Mandalore", correct: false},
            {text: "Darth", correct: false}
        ]
    },
    {
        question: "What title did Luke Skywalker grant his niece Jaina Solo upon her knighthood as a Jedi?",
        answers: [
            {text: "Padawan", correct: false},
            {text: "Sword of the Jedi", correct: true},
            {text: "Guardian of the Galaxy", correct: false},
            {text: "Jedi Sentinel", correct: false}
        ]
    },
    {
        question: "Which lightsaber fighting style did Mace Windu originate?",
        answers: [
            {text: "Juyo", correct: false},
            {text: "Soresu", correct: false},
            {text: "Ataru", correct: false},
            {text: "Vaapad", correct: true}
        ]
    },
    {
        question: "Which Sith Lord instituted the 'Rule of Two'?",
        answers: [
            {text: "Exar Kun", correct: false},
            {text: "Ajunta Pall", correct: false},
            {text: "Darth Bane", correct: true},
            {text: "Darth Malak", correct: false}
        ]
    },
    {
        question: "Which bounty hunter did Princess Leia impersonate in Return of the Jedi?",
        answers: [
            {text: "Boba Fett", correct: false},
            {text: "Boushh", correct: true},
            {text: "Dengar", correct: false},
            {text: "Bossk", correct: false}
        ]
    },
    {
        question: "Upon becoming a Sith Lord, what name did Count Dooku take?",
        answers: [
            {text: "Darth Tyrannus", correct: true},
            {text: "Darth Sidious", correct: false},
            {text: "Darth Bane", correct: false},
            {text: "Darth Tenebrous", correct: false}
        ]
    },
    {
        question: "On which planet did Yoda live in hiding after the Jedi purge?",
        answers: [
            {text: "Dathomir", correct: false},
            {text: "Dantooine", correct: false},
            {text: "Dagobah", correct: true},
            {text: "Dromund Kaas", correct: false}
        ]
    },
    {
        question: "Which planet is home to Chewbacca and the wookiees?",
        answers: [
            {text: "Endor", correct: false},
            {text: "Dantooine", correct: false},
            {text: "Kashyyyk", correct: true},
            {text: "Tatooine", correct: false}
        ]
    },
    {
        question: "What is Han Solo's home planet?",
        answers: [
            {text: "Corellia", correct: true},
            {text: "Serreno", correct: false},
            {text: "Kuat", correct: false},
            {text: "Bespin", correct: false}
        ]
    }
];