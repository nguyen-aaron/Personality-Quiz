console.log("script running");

// Access all the figures using the class
const pictures = document.querySelectorAll("[data-trait]");
const choiceRow = document.querySelectorAll(".choice-row");
let result;

console.log(choiceRow)

// 'quizTaker' object here
let quizTaker = {
  logical: 0,
  creative: 0,
  introvert: 0,
  extrovert: 0,
};

function nextRow() {
  let rowCount = questionsAnswered(quizTaker);
  console.log(quizTaker);
  if (rowCount == choiceRow.length) return;
  choiceRow[rowCount].classList.add("show-section");
}

function resetRow(category) {
  let trait;
  let row = document.querySelectorAll(`[data-category=${category}]`);
  // take the highlight out 
  for (let picture of row) {
    trait = picture.getAttribute("data-trait");
    // if picture is highlighted, decrement its trait
    if (picture.classList.contains("has-background-warning")) {
      quizTaker[trait]--;
    }
    // unhighlight everything
    picture.classList.remove("has-background-light");
    picture.classList.remove("has-background-warning");
  }
}

function questionsAnswered(quizTaker) {
  let sum = quizTaker.logical + quizTaker.creative + quizTaker.introvert + quizTaker.extrovert;
  return sum;
}

function allQuestionsAnswered(quizTaker) {
  return questionsAnswered(quizTaker) == 6;
}

function showResult() {
  if (quizTaker.logical > quizTaker.creative) {
    result = "logical-";
  } else {
    result = "creative-";
  }

  if (quizTaker.introvert > quizTaker.extrovert) {
    result += "introvert";
  } else {
    result += "extrovert";
  }

  // show the result
  console.log(result);
  document.body.setAttribute("data-final-answer", result);
}

function resetGame() {
  let row;
  quizTaker = { logical: 0, creative: 0, introvert: 0, extrovert: 0 };

  for (let picture of pictures) {
    picture.classList.remove("has-background-warning");
  }
  for (let i = 0; i < choiceRow.length; i++) {
    row = choiceRow[i];
    row.classList.remove("show-section");
  }
  document.body.setAttribute("data-final-answer", "none");
}

document.querySelector("#play-again-button").addEventListener("click", function() {
  resetGame();
})
// Make every image clickable!
pictures.forEach((picture) => {
  picture.addEventListener("click", () => {

    if (allQuestionsAnswered(quizTaker)) return;
    if (picture.classList.contains("has-background-warning")) return;
    // Get the user's answer.
    let trait = picture.getAttribute("data-trait");
    let category = picture.getAttribute("data-category");

    resetRow(category);
    nextRow();
    // Change the background yellow
    picture.classList.toggle("has-background-light");
    picture.classList.toggle("has-background-warning");

    // Increment the right personality trait
    quizTaker[trait]++;
    console.log(quizTaker);

    // If its the last question, compute result, and show it.
    if (allQuestionsAnswered(quizTaker)) { showResult() };
  });
});
