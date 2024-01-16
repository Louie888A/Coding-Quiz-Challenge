// Create a function to display user initials and score
function displayScoreInitials() {
  let highScoreLs = JSON.parse(localStorage.getItem("highscores"));
  highScoreLs.sort(function scoreOrder(a, b) {
    return b.score - a.score;
  });
  if (highScoreLs) {
    let olEl = document.querySelector("#highscores");
    for (let i = 0; i < highScoreLs.length; i++) {
      let liEl = document.createElement("li");
      liEl.textContent = highScoreLs[i].initials + " - " + highScoreLs[i].score;
      olEl.appendChild(liEl);
    }
  }
}
displayScoreInitials();

let clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", function () {
  let finalScore = document.querySelector("#highscores");
  localStorage.removeItem("highscores");
  localStorage.removeItem("saved-initials");
  localStorage.removeItem("saved-finalScore");
  finalScore.innerHTML = "";
});
