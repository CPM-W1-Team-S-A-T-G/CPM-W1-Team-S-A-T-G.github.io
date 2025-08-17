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
    question: "What is a quantum computer?",
    options: ["A computer that has the capabilities of quantuming.", "A computer that can process quantum physics.", "A computer that takes advantage of quantum mechanical phenomena.", "A computer that does not use circuits but instead has physicists that carry out calculations at light speed."],
    answer: 3
  },
  {
    question: "What is the Quantum Turing Machine used for?",
    options: ["It is used to turn a machine quantum.", "It is used for traversal.", "It is used to skip the time intervals for machines.", "It is used to describe a simple computer using quantum theory."],
    answer: 4
  },
  {
    question: "When is a qubit in superposition?",
    options: ["When you are looking at it.", "When both α and ß are non-zero.", "When both α and ß are zero or below zero.", "When it is 4d."],
    answer: 2
  },
  {
    question: "Which companies had achieved quantum supremacy during 2019?",
    options: ["Google AI and NASA.", "Tesla and Microsoft AI.", "Apple and Amazon.", "Nvidia and Meta."],
    answer: 1
  },
  {
    question: "Shor's algorithm is used to...",
    options: ["find prime factors in an integer.", "find the expansion of an integer.", "deduct the amount of errors in a sequence of coded instructions.", "find different integers in an equation."],
    answer: 1
  },
  {
    question: "What is the Hidden Subgroup Problem(HSP).",
    options: ["It is used for graph theory, where the goal is to find hidden nodes within a network by analyzing the shortest path between nodes.", "It is a cryptographic encryption algorithm used to secure communication between two parties by hiding their public keys in a group structure.", "It is a machine learning classification problem used to find hidden subgroups in a dataset.", "It is a framework used to capture problems such as factorising and graph isomorphism."],
    answer: 4
  },
  {
    question: "When did quantum computing become popular?",
    options: ["The 2000s", "The 1980s", "The 1920s", "The 1960s"],
    answer: 2
  },
  {
    question: "What can be used to represent the qubit state?",
    options: ["The binary code", "A 2-dimensional vector.", "A light switch.", "A coin flip."],
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

