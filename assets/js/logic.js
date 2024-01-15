const startBtn = document.querySelector("#start");
const timer = document.querySelector("#time");
const startScreen = document.querySelector("#start-screen");
const endScreen = document.querySelector("#end-screen");
const questionTitle = document.getElementById("question-title");
const questions = document.querySelector("#questions");
const finalScore = document.querySelector("#final-score");
const feedback = document.querySelector("#feedback");

const correctTune = new Audio("./assets/sfx/correct.wav");
const incorrectTune = new Audio("./assets/sfx/incorrect.wav");

let currentQuestionIndex = 0;
let questionNumber = 0;
let choiceBtn;
let timeLeft;
let timeInterval;

startBtn.addEventListener("click", function (e) {
  startScreen.classList.add("hide");
  questions.classList.remove("hide");
  createChoiceBtn();
  startQuiz();
});

function startQuiz() {
  timeLeft = 119;
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timer.textContent = timeLeft;
      timeLeft--;
    } else {
      timer.textContent = "time up";
    }
  }, 2000);
}

function createChoiceBtn() {
  let userChoice = document.getElementById("choices");
  for (let i = 0; i < 4; i++) {
    let button = document.createElement("button");
    button.classList.add(".choices-button");
    userChoice.appendChild(button);
  }
  choiceBtn = document.querySelectorAll(".choices-button");
  for (let i = 0; i < choiceBtn.length; i++) {
    choiceBtn[i].addEventListener("click", btnClick);
  }
  console.log(choiceBtn, "button");
  feedback.classList.remove("hide");
}

function displayQuestions() {
  // Retrieve the current question from the quizQuestions array based on the current index (i)
  currentQuestionIndex = quizQuestions[questionNumber];
  // Update the text content of the question title element
  // to display the current question number and title
  questionTitle.textContent = `Question ${questionNumber + 1}: ${
    currentQuestionIndex["question"]
  }`;
  console.log(
    `Question ${questionNumber + 1}: ${currentQuestionIndex["question"]}`
  );
  // Iterate through the choices for the current question
  for (let j = 0; j < currentQuestionIndex.choices.length; j++) {
    // Set the text content of each choice button to display the corresponding choice
    // for the current question
    choiceBtn[j].textContent = currentQuestionIndex.choices[j];
  }
}
