document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // 3D Scroll Rotate Effect
  gsap.to(".intro-bg", {
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "+=4000", // 4-5 scrolls
      scrub: true,
    },
    rotationY: 720, // Two full rotations
    ease: "none",
    transformOrigin: "center center"
  });

  // Animate image on scroll
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

  // Smooth Scroll
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
    if (!popupDismissed) quizPopup.style.display = 'flex';
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
