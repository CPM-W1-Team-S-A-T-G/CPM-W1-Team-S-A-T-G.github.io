document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // Quiz Pop-up Logic
  gsap.registerPlugin(ScrollTrigger);

  const quizPopup = document.getElementById('quizPopup');
  const startQuizButton = document.getElementById('startQuizButton');
  const closeQuizButton = document.getElementById('closeQuizButton');
  const infoSection = document.getElementById('info');

  let popupDismissed = false; // Track if user clicked "Not Now"

  function showQuizPopup() {
    if (!popupDismissed) {
      quizPopup.style.display = 'flex';
    }
  }

  function hideQuizPopup() {
    quizPopup.style.display = 'none';
  }

  startQuizButton.addEventListener('click', () => {
    alert('Quiz started! (Redirect to your quiz logic here)');
    popupDismissed = false; // Optional: allow showing again if quiz starts
    hideQuizPopup();
  });

  closeQuizButton.addEventListener('click', () => {
    popupDismissed = true;
    hideQuizPopup();
  });

  // Trigger when entering the Info section (from top or bottom)
  ScrollTrigger.create({
    trigger: infoSection,
    start: "top 80%",
    end: "bottom bottom",
    onEnter: () => showQuizPopup(),
    onEnterBack: () => showQuizPopup(),
    onLeave: () => popupDismissed = false,      // Reset flag when user leaves section
    onLeaveBack: () => popupDismissed = false   // Reset flag when user scrolls back up
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
