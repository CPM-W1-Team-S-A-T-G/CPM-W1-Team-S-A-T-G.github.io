document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation Highlight ---
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname.split('/').pop();

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  // --- GSAP + ScrollTrigger ---
  gsap.registerPlugin(ScrollTrigger);

  // --- Pop-up Quiz Logic ---
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
    popupDismissed = false; // Reset or leave true if you want it to stop
    hideQuizPopup();
  });

  closeQuizButton.addEventListener('click', () => {
    popupDismissed = true;
    hideQuizPopup();
  });

  ScrollTrigger.create({
    trigger: infoSection,
    start: "top 80%",
    end: "bottom bottom",
    onEnter: () => showQuizPopup(),
    onEnterBack: () => showQuizPopup(),
    onLeave: () => popupDismissed = false,
    onLeaveBack: () => popupDismissed = false
  });

  // --- Animate Intro Background on Scroll into #home ---
// --- Animate Intro Background on Scroll into #home ---
ScrollTrigger.create({
  trigger: "#home",
  start: "top center",
  onEnter: () => {
    gsap.fromTo(".intro-bg",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 0.8, duration: 1.5, ease: "power2.out" }
    );
  },
  onEnterBack: () => {
    gsap.fromTo(".intro-bg",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 0.8, duration: 1.5, ease: "power2.out" }
    );
  }
});


  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});

