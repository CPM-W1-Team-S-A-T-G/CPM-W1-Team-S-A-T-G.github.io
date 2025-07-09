document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // Animate the intro image
  ScrollTrigger.create({
    trigger: "#home",
    start: "top center",
    onEnter: animateIntroBG,
    onEnterBack: animateIntroBG
  });

  // Animate history image
gsap.to('.content-section img', {
  scrollTrigger: {
    trigger: '.content-section img',
    start: 'top 80%',
    toggleActions: 'play none none reset'
  },
  opacity: 1,
  scale: 1,
  duration: 1.2,
  ease: 'power2.out'
});

  function animateIntroBG() {
    gsap.fromTo(".intro-bg",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 0.8, duration: 1.5, ease: "power2.out" }
    );
  }

  // Smooth scroll for nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute('href'));
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Pop-up Quiz logic
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
