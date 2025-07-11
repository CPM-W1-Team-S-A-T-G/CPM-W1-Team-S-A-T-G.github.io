document.addEventListener('DOMContentLoaded', () => {

  // QUIZ FUNCTIONALITY
const quizContainer = document.getElementById('quizContainer');
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const nextButton = document.getElementById('nextButton');

const quizData = [
  {
    question: "What is a qubit?",
    options: ["A classical bit", "A logic gate", "A quantum bit", "A capacitor"],
    answer: "A quantum bit"
  },
  {
    question: "Which algorithm is used for factoring large numbers in quantum computing?",
    options: ["Dijkstra's algorithm", "Shor's algorithm", "Grover's algorithm", "Bellman's algorithm"],
    answer: "Shor's algorithm"
  },
  {
    question: "What does quantum superposition mean?",
    options: ["Being in one state at a time", "Copying information", "Being in multiple states simultaneously", "Teleportation"],
    answer: "Being in multiple states simultaneously"
  }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  quizPopup.style.display = 'none';
  quizContainer.style.display = 'flex';
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const questionData = quizData[currentQuestion];
  quizQuestion.textContent = questionData.question;
  quizOptions.innerHTML = "";

  questionData.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.addEventListener('click', () => {
      if (option === questionData.answer) {
        score++;
      }
      nextButton.style.display = 'block';
    });
    quizOptions.appendChild(btn);
  });

  nextButton.style.display = 'none';
}

nextButton.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  quizQuestion.textContent = `Quiz Completed! Your score is ${score}/${quizData.length}`;
  quizOptions.innerHTML = "";
  nextButton.style.display = 'none';
}

// Replace alert in start button
startQuizButton.addEventListener('click', () => {
  popupDismissed = false;
  startQuiz();
});

  gsap.registerPlugin(ScrollTrigger);

  // Animate intro background
  ScrollTrigger.create({
    trigger: "#home",
    start: "top center",
    onEnter: animateIntroBG,
    onEnterBack: animateIntroBG
  });

  function animateIntroBG() {
    gsap.fromTo(".intro-bg",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 0.8, duration: 1.5, ease: "power2.out" }
    );
  }

  // Animate all images with fade-in and scale
  document.querySelectorAll('.content-section img').forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img,
        start: 'top 80%',
        toggleActions: 'play none none reset'
      },
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out'
    });
  });

  // Smooth scroll for nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute('href'));
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Pop-up Quiz
  const quizPopup = document.getElementById('quizPopup');
  const startQuizButton = document.getElementById('startQuizButton');
  const closeQuizButton = document.getElementById('closeQuizButton');
  const infoSection = document.getElementById('info');
  let popupDismissed = false;

  function showQuizPopup() {
    if (!popupDismissed) {
      quizPopup.style.display = 'flex';
    }
  }

  function hideQuizPopup() {
    quizPopup.style.display = 'none';
  }

  startQuizButton.addEventListener('click', () => {
    alert("Redirecting to quiz...");
    popupDismissed = false;
    hideQuizPopup();
  });

  closeQuizButton.addEventListener('click', () => {
    popupDismissed = true;
    hideQuizPopup();
  });

  ScrollTrigger.create({
    trigger: infoSection,
    start: "top 80%",
    onEnter: showQuizPopup,
    onEnterBack: showQuizPopup,
    onLeave: () => popupDismissed = false,
    onLeaveBack: () => popupDismissed = false
  });
});
