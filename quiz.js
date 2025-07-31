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

// Quiz logic
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
  showQuestion();
}

function showQuestion() {
  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const nextBtn = document.getElementById('nextQuestionButton');
  const resultEl = document.getElementById('quiz-result');

  resultEl.style.display = 'none';
  nextBtn.style.display = 'none';
  optionsEl.innerHTML = '';

  if (currentQuestion >= questions.length) {
    resultEl.style.display = 'block';
    resultEl.innerHTML = `Quiz complete! Your score is ${score} out of ${questions.length}.`;
    return;
  }

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => {
      if (index === q.answer) score++;
      currentQuestion++;
      showQuestion();
    };
    optionsEl.appendChild(btn);
  });
}
