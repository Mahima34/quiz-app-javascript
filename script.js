const questions = [
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Creative Style Sheets", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    answers: [
      { text: "<style>", correct: true },
      { text: "<css>", correct: false },
      { text: "<script>", correct: false },
      { text: "<link>", correct: false },
    ],
  },
  {
    question: "Which property is used to change the background color?",
    answers: [
      { text: "background-color", correct: true },
      { text: "bg-color", correct: false },
      { text: "color", correct: false },
      { text: "background", correct: false },
    ],
  },
  {
    question: "Which of these is a JavaScript framework?",
    answers: [
      { text: "React", correct: true },
      { text: "Laravel", correct: false },
      { text: "Django", correct: false },
      { text: "Ruby on Rails", correct: false },
    ],
  },
  {
    question: "Which of the following is used for version control?",
    answers: [
      { text: "Git", correct: true },
      { text: "FTP", correct: false },
      { text: "SSH", correct: false },
      { text: "HTTP", correct: false },
    ],
  },
];

//step-2
const timeEl = document.querySelector(".timer");
const timeBar = document.getElementById("time-bar");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const playAgainBtn = document.getElementById("playAgainBtn");

let questionNumber = document.getElementById("question-number");

let currentQuestionIndex = 0;
let score = 0;
timerInterval = null;
isAnswered = false;

function showAnswer() {
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
}

function startTimer() {
  let timeLeft = 1;
  const totalTime = 1;

  timeEl.innerHTML = timeLeft;
  timeBar.style.transition = "none";
  timeBar.style.width = "100%";

  void timeBar.offsetWidth;
  timeBar.style.transition = `width ${totalTime}s linear`;
  timeBar.style.width = "0%";

  setInterval(() => {
    timeLeft--;
    timeEl.innerHTML = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeEl.innerText = 0;
      showNextQuestion();

      if (!isAnswered) {
        showAnswer();
        setTimeout(showNextQuestion, 800);
      }
    }
  }, 1000);
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  isAnswered = true;
  setTimeout(showNextQuestion, 1000);
}

function showOptions(currentQuestion) {
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function showQuestion() {
  startTimer();
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionNumber.innerHTML = `Q.${questionNo} of ${questions.length}`;
  questionElement.innerText = currentQuestion.question;
  showOptions(currentQuestion);
}

function showScore() {
  timerEl.style.visibility = "hidden";
  timeBar.style.visibility = "hidden";
  questionNumber.style.visibility = "hidden";
  clearInterval(timerInterval);
  resetState();
  questionElement.innerHTML = `Score: ${score}`;
  playAgainBtn.style.display = "block";
}

function showNextQuestion() {
  clearInterval(timerInterval);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
  currentQuestionIndex++;
}

function startQuiz() {
  playAgainBtn.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  showNextQuestion();
}

playAgainBtn.addEventListener("click", startQuiz);
startQuiz();
