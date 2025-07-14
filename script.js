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

    // Calculate total width to scroll based on all slides' widths
    let totalSlidesWidth = 0;
    slides.forEach(slide => {
      totalSlidesWidth += slide.offsetWidth;
    });

    // The scroll amount is the total width of all slides minus one viewport width.
    // This makes the last slide align to the right edge of the viewport.
    const scrollAmount = totalSlidesWidth - window.innerWidth;

    if (scrollAmount <= 0) {
      // If content fits within one viewport, no horizontal scroll needed
      return;
    }

    // Main horizontal scroll animation
    const horizontalScrollTween = gsap.to(container, {
      x: -scrollAmount,
      ease: "none", // Linear movement
      scrollTrigger: {
        trigger: wrapper,
        pin: true, // Pin the wrapper to keep it in view while scrolling horizontally
        scrub: 1, // Smoothly link scroll progress to animation progress
        start: "top top", // Start pinning when the top of the wrapper hits the top of the viewport
        end: () => `+=${scrollAmount}`, // End when we've scrolled the full horizontal content width vertically
        invalidateOnRefresh: true, // Recalculate on window resize for correct scrollAmount
        // markers: true, // Uncomment for debugging scroll triggers
      }
    });

    // Animate images within horizontal slides using containerAnimation
    slides.forEach(slide => {
      const img = slide.querySelector('.animated-image');
      if (img) {
        gsap.fromTo(img,
          { opacity: 0, scale: 0.8 }, // Initial state (can also be defined in CSS)
          {
            opacity: 1,
            scale: 1,
            duration: 0.8, // Duration for the image animation
            ease: 'power2.out',
            scrollTrigger: {
              trigger: slide, // Each slide is the trigger for its own image
              containerAnimation: horizontalScrollTween, // Link to the parent horizontal scroll animation
              start: "left center", // When the left edge of the slide hits the center of the viewport
              end: "right center", // When the right edge of the slide leaves the center of the viewport
              toggleActions: 'play none none reverse', // Play animation on enter, reverse on leave
              // markers: true, // Uncomment for debugging individual slide triggers
            }
          }
        );
      }
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
            autoKill: false // Prevents ScrollTo from stopping if user interacts
          },
          ease: "power2.inOut"
        });
      }
    });
  });

  // Quiz popup functionality
  const quizPopup = document.getElementById('quizPopup');
  const startQuizButton = document.getElementById('startQuizButton');
  const closeQuizButton = document.getElementById('closeQuizButton');
  const quizContainer = document.getElementById('quizContainer');
  let popupDismissed = false; // Flag to check if popup has been dismissed

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
    startQuiz(); // Assuming startQuiz() is defined in quiz.js
  });

  closeQuizButton.addEventListener('click', () => {
    popupDismissed = true; // Set flag when dismissed
    hideQuizPopup();
  });

  // Trigger quiz popup when user finishes scrolling through the 'Info' horizontal section
  ScrollTrigger.create({
    trigger: "#info-scroll-wrapper", // Use the horizontal wrapper as the trigger
    start: "bottom bottom", // When the bottom of the wrapper leaves the bottom of the viewport
    onEnter: showQuizPopup, // Show popup when trigger condition is met
    onLeaveBack: hideQuizPopup, // Hide popup if scrolling back up into the section
    // onLeave and onEnterBack for popupDismissed could be added for more complex behavior
    // For simplicity, `popupDismissed` remains true once set, until page reload.
    // markers: true, // Uncomment for debugging
  });
});
