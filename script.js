const questions = [ /* ...1000 questions... */ ];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const progress = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
const quizHeader = document.getElementById("quiz-header");
const questionBox = document.getElementById("question-box");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restartBtn");
const progressFill = document.getElementById("progress-fill");
const scoreLiveNum = document.getElementById("score-live-num");

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;

  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;
  scoreLiveNum.textContent = score;

  optionsContainer.innerHTML = "";

  q.options.forEach((optionText, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");

    const idxSpan = document.createElement("span");
    idxSpan.classList.add("idx");
    idxSpan.textContent = `${String.fromCharCode(65 + index)})`;

    const labelSpan = document.createElement("span");
    labelSpan.textContent = optionText;

    btn.appendChild(idxSpan);
    btn.appendChild(labelSpan);
    btn.addEventListener("click", () => selectOption(btn, index));
    optionsContainer.appendChild(btn);
  });
}

function selectOption(selectedBtn, index) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) {
      btn.classList.add("correct");
    }
  });

  if (index === q.correct) {
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizHeader.classList.add("hidden");
  questionBox.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultBox.classList.remove("hidden");
  progressFill.style.width = "100%";

  scoreText.textContent = `${score} / ${questions.length} correct`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;

  quizHeader.classList.remove("hidden");
  questionBox.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  resultBox.classList.add("hidden");

  loadQuestion();
});

// Start the quiz
loadQuestion();
