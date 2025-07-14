document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

  /**
   * Sets up horizontal scrolling for a given section.
   * @param {string} wrapperId - The ID of the horizontal-scroll-wrapper element.
   * @param {string} slideClass - The class name of the individual slides within the container.
   */
  function setupHorizontalScroll(wrapperId, slideClass) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const container = wrapper.querySelector('.horizontal-content-container');
    const slides = gsap.utils.toArray(`.${slideClass}`);

    let totalSlidesWidth = 0;
    slides.forEach(slide => {
      totalSlidesWidth += slide.offsetWidth;
    });

    const scrollAmount = totalSlidesWidth - window.innerWidth;

    if (scrollAmount <= 0) {
      // If content fits within one viewport, no horizontal scroll needed
      // Remove any pinning or horizontal movement for this section if it was previously applied
      ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === wrapper) {
              st.kill();
          }
      });
      return;
    }

    // Main horizontal scroll animation
    const horizontalScrollTween = gsap.to(container, {
      x: -scrollAmount,
      ease: "none", // Linear movement for scrubbing
      scrollTrigger: {
        trigger: wrapper,
        pin: true, // Pin the wrapper to keep it in view while scrolling horizontally
        scrub: 1, // Smoothly link scroll progress to animation progress
        start: "top top", // Start pinning when the top of the wrapper hits the top of the viewport
        end: () => `+=${scrollAmount}`, // End when we've scrolled the full horizontal content width vertically
        invalidateOnRefresh: true, // Recalculate on window resize for correct scrollAmount
        // markers: true, // Uncomment for debugging main scroll trigger
      }
    });

    // Animate image and text within each horizontal slide using containerAnimation
    slides.forEach((slide, i) => {
      const img = slide.querySelector('.animated-image');
      const text = slide.querySelector('p');

      // Ensure initial state for elements that will animate
      gsap.set([img, text], { opacity: 0 }); // Set initial opacity to 0 for a clean entrance

      // Create a timeline for each slide's content to control its reveal and conceal
      // This timeline will be controlled by the main horizontal scroll
      const slideContentTL = gsap.timeline({
        scrollTrigger: {
          trigger: slide, // Trigger for this specific slide
          containerAnimation: horizontalScrollTween, // Linked to the main horizontal scroll
          start: "left 100%", // Start animating when the left edge of the slide enters the viewport
          end: "right 0%",    // End animating when the right edge of the slide leaves the viewport
          scrub: true, // Smoothly animate based on scroll position
          // markers: {startColor: "purple", endColor: "orange", indent: 200 * i}, // Uncomment for debugging each slide's content trigger
        }
      });

      // Animation sequence for each slide:
      // Phase 1: Fade in and scale up as it enters the screen from the right
      slideContentTL.to(img, { opacity: 1, scale: 1, ease: 'power2.out' }, 0); // Start image at timeline beginning
      slideContentTL.to(text, { opacity: 1, y: 0, ease: 'power2.out' }, 0);   // Start text at timeline beginning

      // Phase 2: Fade out and scale down/move as it leaves the screen to the left
      // This uses relative progress on the timeline to control when the fade out begins
      // A progress of 0.5 (midpoint of the trigger) ensures it's fully visible before fading
      slideContentTL.to(img, { opacity: 0, scale: 0.8, ease: 'power2.out' }, 0.8); // Fade out towards the end of the slide's journey
      slideContentTL.to(text, { opacity: 0, y: -20, ease: 'power2.out' }, 0.8); // Fade out and slightly move up
    });
  }

  // Setup horizontal scrolling for each relevant section
  setupHorizontalScroll('history-scroll-wrapper', 'history-slide');
  setupHorizontalScroll('algorithm-scroll-wrapper', 'algorithm-slide');
  setupHorizontalScroll('info-scroll-wrapper', 'info-slide');

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
