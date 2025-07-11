document.addEventListener('DOMContentLoaded', () => {
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

  // Animate images
  document.querySelectorAll('.animated-image').forEach(img => {
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

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute('href'));
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Quiz popup
  const quizPopup = document.getElementById('quizPopup');
  const startQuizButton = document.getElementById('startQuizButton');
  const closeQuizButton = document.getElementById('closeQuizButton');
  const infoSection = document.getElementById('info');
  const quizContainer = document.getElementById('quizContainer');
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
    hideQuizPopup();
    quizContainer.style.display = 'flex';
    startQuiz();
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
