const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "HyperText Markup Language",
      "HyperText Markdown Language",
      "Hyperlink and Text Markup Language"
    ],
    correct: 1
  },
  {
    question: "Which tag is used to link a CSS file in HTML?",
    options: ["<style>", "<css>", "<link>", "<script>"],
    correct: 2
  },
  {
    question: "Which of these is used to declare a variable in modern JavaScript?",
    options: ["var", "let", "int", "define"],
    correct: 1
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    correct: 0
  },
  {
    question: "Which company maintains GitHub?",
    options: ["Google", "Amazon", "Microsoft", "Meta"],
    correct: 2
  }
];

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

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;

  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  progress.textContent = Question ${currentQuestion + 1} of ${questions.length};

  optionsContainer.innerHTML = "";

  q.options.forEach((optionText, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = optionText;
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

  scoreText.textContent = You scored ${score} out of ${questions.length}!;
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
