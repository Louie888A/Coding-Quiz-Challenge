// Define some variables
const startBtn = document.querySelector("#start");
const time = document.querySelector("#time");
const startScreen = document.querySelector("#start-screen");
const endScreen = document.querySelector("#end-screen");
const questionsScreen = document.querySelector("#questions");
let currentQuestionIndex = 0;
let questionNumber = 0;
let choiceButtonEl;
const fb = document.querySelector("#feedback");
const questionTitleEl = document.getElementById("question-title");
let timeLeft;
let timeInterval;
const finalScore = document.querySelector("#final-score");

// Use audio file
const correctAudio = new Audio("./assets/sfx/correct.wav");
const incorrectAudio = new Audio("./assets/sfx/incorrect.wav");

// Start of start Quiz button to do
startBtn.addEventListener("click", function (event) {
  // Use hide/ unhide the screen
  startScreen.classList.add("hide");
  questionsScreen.classList.remove("hide");
  createOptionButton();
  startQuiz();
  displayQuestions();
});

// Function to change the div view
function createOptionButton() {
  let choicesDiv = document.getElementById("choices");
  for (let i = 0; i < 4; i++) {
    let button = document.createElement("button");
    // Adding a CSS class to the button for styling
    button.classList.add("choices-button");
    choicesDiv.appendChild(button);
  }
  choiceButtonEl = document.querySelectorAll(".choices-button");
  for (let i = 0; i < choiceButtonEl.length; i++) {
    choiceButtonEl[i].addEventListener("click", buttonsEventList);
  }
  fb.classList.remove("hide");
}

// Function to do when user clicks start button and start time calculation
function startQuiz() {
  timeLeft = 59;
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      time.textContent = timeLeft;
      timeLeft--;
    } else {
      time.textContent = "time up";
      endQuiz();
    }
  }, 1000);
}

// Function to display the current question and choices on the screen
function displayQuestions() {
  currentQuestionIndex = quizQuestions[questionNumber];

  questionTitleEl.textContent = `Question ${questionNumber + 1}: ${
    currentQuestionIndex["question-title"]
  }`;
  for (let j = 0; j < currentQuestionIndex.choices.length; j++) {
    choiceButtonEl[j].textContent = currentQuestionIndex.choices[j];
  }
}

// Function to do after user clicks on
function buttonsEventList(event) {
  let selectedChoice = event.target.textContent;
  let currentQuestion = quizQuestions[questionNumber];
  if (selectedChoice === currentQuestion.answer) {
    fb.textContent = "Your answer is correct!";
    correctAudio.play();
    setTimeout(function () {
      fb.textContent = "";
      moveToNextQuestion();
    }, 1000);
  } else {
    timeLeft -= 3;
    fb.textContent = "Your answer is wrong!";
    incorrectAudio.play();
    setTimeout(function () {
      fb.textContent = "";
      moveToNextQuestion();
    }, 1000);
  }
}

function moveToNextQuestion() {
  if (questionNumber < quizQuestions.length - 1) {
    questionNumber++;
    displayQuestions();
  } else {
    console.log("Quiz completed!");
    endQuiz();
  }
}

function endQuiz() {
  displayScore();
  clearInterval(timeInterval);
  questionsScreen.classList.add("hide");
  endScreen.classList.remove("hide");
  fb.classList.add("hide");
}

// Create function to display user total score and store into localStorage
function displayScore() {
  if (endQuiz) {
    finalScore.textContent = timeLeft;
  }
}
let submitBtn = document.querySelector("#submit");
let highscoresArray = [];
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let initials = document.querySelector("#initials").value;
  finalScore.textContent = timeLeft;
  highscores = { initials: initials, score: timeLeft };
  let highScoreSt = JSON.parse(localStorage.getItem("highscores"));
  if (highScoreSt === null) {
    highscoresArray.push(highscores);
    localStorage.setItem("highscores", JSON.stringify(highscoresArray));
  } else {
    highScoreSt.push(highscores);
    localStorage.setItem("highscores", JSON.stringify(highScoreSt));
  }
  location.href = "highscores.html";
});
