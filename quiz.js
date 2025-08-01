// ===== Scroll Popup Logic =====
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
  document.getElementById('quizContainer').style.display = 'flex';
  startQuiz();
});

// ===== Quiz Logic =====
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

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById('quiz-result').style.display = 'none';
  showQuestion();
}

function showQuestion() {
  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const resultEl = document.getElementById('quiz-result');

  resultEl.innerHTML = '';
  resultEl.style.display = 'none';
  optionsEl.innerHTML = '';

  const nextBtn = document.createElement('button');
  nextBtn.id = 'nextBtn';
  nextBtn.textContent = "Next Question";
  nextBtn.style.display = 'none';
  nextBtn.onclick = () => {
    currentQuestion++;
    showQuestion();
  };

  if (currentQuestion >= questions.length) {
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
    return;
  }

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'quiz-option';
    btn.onclick = () => {
      const allBtns = document.querySelectorAll('.quiz-option');
      allBtns.forEach(b => b.disabled = true);

      if (index === q.answer) {
        btn.classList.add('correct');
        resultEl.innerHTML = "<p class='feedback'>✅ Correct!</p>";
        score++;
      } else {
        btn.classList.add('wrong');
        resultEl.innerHTML = `<p class='feedback'>❌ Wrong! Correct answer: <strong>${q.options[q.answer]}</strong></p>`;
        allBtns[q.answer].classList.add('correct');
      }

      resultEl.style.display = 'block';
      optionsEl.appendChild(nextBtn);
      nextBtn.style.display = 'inline-block';
    };
    optionsEl.appendChild(btn);
  });
}

