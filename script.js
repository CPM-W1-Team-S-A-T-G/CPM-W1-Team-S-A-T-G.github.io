document.addEventListener('DOMContentLoaded', () => {
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
    alert("Redirecting to quiz page...");
    popupDismissed = false;
    hideQuizPopup();
  });

  closeQuizButton.addEventListener('click', () => {
    popupDismissed = true;
    hideQuizPopup();
  });

  // Quiz popup trigger
  ScrollTrigger.create({
    trigger: infoSection,
    start: "top 80%",
    onEnter: showQuizPopup,
    onEnterBack: showQuizPopup,
    onLeave: () => popupDismissed = false,
    onLeaveBack: () => popupDismissed = false,
  });

  // Animate the intro image every time you scroll into home
  ScrollTrigger.create({
    trigger: "#home",
    start: "top center",
    onEnter: () => animateIntroBG(),
    onEnterBack: () => animateIntroBG()
  });

  function animateIntroBG() {
    gsap.fromTo(".intro-bg",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 0.8, duration: 1.5, ease: "power2.out" }
    );
  }

  // Smooth scroll behavior for nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute('href'));
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
