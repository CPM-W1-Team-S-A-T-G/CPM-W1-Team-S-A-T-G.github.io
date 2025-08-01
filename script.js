document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  function setupScrollSection(wrapperId, slideClass, direction = 'right') {
    const wrapper = document.getElementById(wrapperId);
    const slides = wrapper.querySelectorAll(`.${slideClass}`);
    const isHorizontal = direction === 'right' || direction === 'left';
    const isVertical = direction === 'up' || direction === 'down';

    let scrollLength = isHorizontal
      ? wrapper.scrollWidth - window.innerWidth
      : wrapper.scrollHeight - window.innerHeight;

    gsap.to(wrapper.querySelector('.horizontal-content-container'), {
      x: direction === 'right' ? -scrollLength : (direction === 'left' ? scrollLength : 0),
      y: direction === 'up' ? -scrollLength : 0,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${scrollLength}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      }
    });

    slides.forEach(slide => {
      const elements = slide.querySelectorAll("img, p");

      gsap.fromTo(elements, {
        opacity: 0,
        scale: 0.8,
        y: 20
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        scrollTrigger: {
          trigger: slide,
          containerAnimation: ScrollTrigger.getById(wrapperId),
          start: "left center",
          toggleActions: "play none none reverse"
        }
      });
    });
  }

  setupScrollSection('history-scroll-wrapper', 'history-slide', 'right');
  setupScrollSection('algorithm-scroll-wrapper', 'algorithm-slide', 'left');
  setupScrollSection('info-scroll-wrapper', 'info-slide', 'up');
});


    // Smooth scroll for navigation links using GSAP's ScrollToPlugin
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const section = document.querySelector(targetId);

            if (section) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: section.offsetTop,
                        autoKill: false
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Quiz popup functionality (kept as is)
    const quizPopup = document.getElementById('quizPopup');
    const startQuizButton = document.getElementById('startQuizButton');
    const closeQuizButton = document.getElementById('closeQuizButton');
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
        if (typeof startQuiz === 'function') {
            startQuiz();
        } else {
            console.warn("startQuiz() function not found. Make sure quiz.js is loaded correctly.");
        }
    });

    closeQuizButton.addEventListener('click', () => {
        popupDismissed = true;
        hideQuizPopup();
    });

    // Trigger quiz popup when user finishes scrolling through the 'Info' horizontal section
    ScrollTrigger.create({
        trigger: "#info-scroll-wrapper",
        start: "bottom bottom",
        onEnter: showQuizPopup,
        onLeaveBack: hideQuizPopup,
        // markers: true,
    });
});
