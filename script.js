document.addEventListener('DOMContentLoaded', () => {
  // Highlight current nav link (for external pages if used)
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // GSAP ScrollTrigger logic for quiz
  gsap.registerPlugin(ScrollTrigger);

  const quizPopup = document.getElementById('quizPopup');
  const startQuizButton = document.getElementById('startQuizButton');
  const closeQuizButton = document.getElementById('closeQuizButton');
  const infoSection = document.getElementById('info');

  function showQuizPopup() {
    quizPopup.style.display = 'flex';
  }

  function hideQuizPopup() {
    quizPopup.style.display = 'none';
  }

  startQuizButton.addEventListener('click', () => {
    alert('Quiz started! (Redirect to your quiz logic here)');
    hideQuizPopup();
  });

  closeQuizButton.addEventListener('click', hideQuizPopup);

  ScrollTrigger.create({
    trigger: infoSection,
    start: "top 80%",
    once: true,
    onEnter: () => {
      showQuizPopup();
    }
  });

  // Smooth scrolling
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
