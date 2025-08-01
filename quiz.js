const quizPopup = document.getElementById('quizPopup');
const startQuizBtn = document.getElementById('startQuizButton');
const closeQuizBtn = document.getElementById('closeQuizButton');
let allowPopup = true;
let wasAtBottom = false;

function checkScrollForPopup() {
  const atBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 10);
  if (atBottom && allowPopup && !wasAtBottom) {
    quizPopup.style.display = 'flex';
    wasAtBottom = true;
  }
  if (!atBottom) {
    wasAtBottom = false;
    allowPopup = true;
  }
}

window.addEventListener('scroll', checkScrollForPopup);

closeQuizBtn.addEventListener('click', () => {
  quizPopup.style.display = 'none';
  allowPopup = false;
});

startQuizBtn.addEventListener('click', () => {
  quizPopup.style.display = 'none';
  document.getElementById('quizContainer').style.display = 'block';
  startQuiz();
});

// ==== QUIZ LOGIC ====

const questions = [
  {
    question: "What is a qubit?",
    options: ["A classical bit", "A 4-state system", "A quantum version of a bit", "A binary digit"],
    answer: 2
  },
  {
    question: "Who introduced the Quantum Turing Machine?",
    options: ["Peter Shor", "Paul Benioff", "David Deutsch", "Richard Feynman"],
    answer: 1
  },
  {
    question: "What does Shor's algorithm solve?",
    options: ["Graph problems", "Sorting", "Factoring large integers", "Machine learning"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('quiz-question');
const optionsEl = document.getElementById('quiz-options');
const feedbackEl = document.getElementById('quiz-feedback');
const resultEl = document.getElementById('quiz-result');
const nextBtn = document.getElementById('nextBtn');

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  resultEl.innerHTML = '';
  resultEl.style.display = 'none';
  feedbackEl.innerHTML = '';
  nextBtn.style.visibility = 'hidden';
  showQuestion();
}

function showQuestion() {
  feedbackEl.innerHTML = '';
  nextBtn.style.visibility = 'hidden';
  resultEl.style.display = 'none';
  optionsEl.innerHTML = '';

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.classList.add('quiz-option');
    btn.onclick = () => handleAnswer(index, btn);
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(selectedIndex, selectedBtn) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll('.quiz-option');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) {
      btn.classList.add('correct');
    } else if (i === selectedIndex) {
      btn.classList.add('wrong');
    }
  });

  if (selectedIndex === q.answer) {
    feedbackEl.innerHTML = "✅ Correct!";
    score++;
  } else {
    feedbackEl.innerHTML = `❌ Wrong! Correct answer: <strong>${q.options[q.answer]}</strong>`;
  }

  nextBtn.style.visibility = 'visible';
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showFinalResult();
  }
};

function showFinalResult() {
  optionsEl.innerHTML = '';
  questionEl.textContent = '';
  feedbackEl.innerHTML = '';
  nextBtn.style.visibility = 'hidden';
  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <p>🎉 Quiz complete! Your score is ${score} out of ${questions.length}.</p>
    <button id="retakeBtn">🔁 Retake Quiz</button>
    <button id="homeBtn">🏠 Back to Home</button>
  `;

  document.getElementById('retakeBtn').addEventListener('click', startQuiz);
  document.getElementById('homeBtn').addEventListener('click', () => {
    document.getElementById('quizContainer').style.display = 'none';
  });
}
