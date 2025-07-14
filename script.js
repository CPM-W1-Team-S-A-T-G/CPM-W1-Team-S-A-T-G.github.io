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
      return;
    }

    // Main horizontal scroll animation
    const horizontalScrollTween = gsap.to(container, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${scrollAmount}`,
        invalidateOnRefresh: true,
        // Uncomment below for snapping (optional)
        // snap: {
        //   snapTo: 1 / (slides.length - 1),
        //   duration: 0.3
        // }
      }
    });

    // Animate image and text within each horizontal slide using containerAnimation
    slides.forEach(slide => {
      const img = slide.querySelector('.animated-image');
      const text = slide.querySelector('p'); // Select the paragraph element

      // Create a timeline for each slide's content to control its fade-in/out
      // This timeline will be controlled by the main horizontal scroll
      const slideContentTL = gsap.timeline({
        scrollTrigger: {
          trigger: slide, // Trigger for this specific slide
          containerAnimation: horizontalScrollTween, // Linked to the main horizontal scroll
          start: "left 80%", // Start animating when 80% of the slide enters the viewport from left
          end: "right 20%",  // Finish animating when 20% of the slide leaves the viewport from right
          scrub: true, // Smoothly animate based on scroll position
          // markers: true, // Uncomment for debugging each slide's content trigger
        }
      });

      // Animate image and text together within this timeline
      if (img) {
        slideContentTL.fromTo(img,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, // Animate in
          0 // Start at the beginning of this timeline
        );
      }
      if (text) {
        slideContentTL.fromTo(text,
          { opacity: 0, y: 20 }, // Initial state for text (can adjust y for subtle slide-up)
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, // Animate in
          0 // Start at the same time as the image
        );
      }

      // Add a fade out to the same timeline.
      // This will automatically reverse based on `scrub: true`
      if (img) {
          slideContentTL.to(img, { opacity: 0, scale: 0.8, duration: 1, ease: 'power2.out' }, ">-0.5"); // Fade out slightly before the end of the trigger
      }
      if (text) {
          slideContentTL.to(text, { opacity: 0, y: 20, duration: 1, ease: 'power2.out' }, "<"); // Fade out at the same time as the image
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
            autoKill: false
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
    if (typeof startQuiz === 'function') { // Check if startQuiz is defined
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
