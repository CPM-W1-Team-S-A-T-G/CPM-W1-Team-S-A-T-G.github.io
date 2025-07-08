document.addEventListener('DOMContentLoaded', () => {
  // Highlight nav
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // Quiz popup logic
  gsap.registerPlugin(ScrollTrigger);

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
    alert('Quiz started! (Redirect to quiz logic)');
    popupDismissed = false; // or true if you want it to stop showing
    hideQuizPopup();
  });

  closeQuizButton.addEventListener('click', () => {
    popupDismissed = true;
    hideQuizPopup();
  });

  // ScrollTrigger to show popup when entering Info section
  ScrollTrigger.create({
    trigger: infoSection,
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      showQuizPopup();
    },
    onEnterBack: () => {
      showQuizPopup();
    },
    onLeave: () => {
      popupDismissed = false; // allow showing again
    },
    onLeaveBack: () => {
      popupDismissed = false; // allow showing again
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

