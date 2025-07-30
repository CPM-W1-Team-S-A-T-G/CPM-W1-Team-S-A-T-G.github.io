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
     * @param {string} direction - 'left' or 'right' for horizontal scroll direction.
     */
    function setupHorizontalScroll(wrapperId, slideClass, direction = 'left') { // Default to 'left' for existing behavior
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
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === wrapper) {
                    st.kill();
                }
            });
            return;
        }

        let xValue;
        if (direction === 'left') {
            xValue = -scrollAmount; // Content moves left, user scrolls right
        } else if (direction === 'right') {
            xValue = 0; // Content starts left, moves to 0 (right)
            gsap.set(container, {x: -scrollAmount}); // Set initial position for right scroll
        }

        // Main horizontal scroll animation
        const horizontalScrollTween = gsap.to(container, {
            x: xValue,
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${scrollAmount}`,
                invalidateOnRefresh: true,
                // markers: true, // Uncomment for debugging main scroll trigger
            }
        });

        // Animate image and text within each horizontal slide using containerAnimation
        slides.forEach((slide, i) => {
            const img = slide.querySelector('.animated-image');
            const text = slide.querySelector('p');

            // Ensure initial state for elements that will animate
            gsap.set([img, text], { opacity: 0, y: 20, scale: 0.8 }); // Added initial y and scale for entry animation

            const slideContentTL = gsap.timeline({
                scrollTrigger: {
                    trigger: slide,
                    containerAnimation: horizontalScrollTween,
                    start: "left 100%", // Start animating when the left edge of the slide enters the viewport
                    end: "right 0%",    // End animating when the right edge of the slide leaves the viewport
                    scrub: true,
                    // markers: {startColor: "purple", endColor: "orange", indent: 200 * i}, // Uncomment for debugging each slide's content trigger
                }
            });

            // Entry animation
            slideContentTL.to([img, text], { opacity: 1, y: 0, scale: 1, ease: 'power2.out' }, 0);
            // Exit animation
            slideContentTL.to([img, text], { opacity: 0, y: -20, scale: 0.8, ease: 'power2.out' }, 0.8);
        });
    }

    /**
     * Sets up vertical scrolling (upwards) for a given section with slides.
     * @param {string} wrapperId - The ID of the vertical-scroll-wrapper element.
     * @param {string} slideClass - The class name of the individual slides within the container.
     */
    function setupVerticalScroll(wrapperId, slideClass) {
        const wrapper = document.getElementById(wrapperId);
        if (!wrapper) return;

        const container = wrapper.querySelector('.horizontal-content-container'); // Still using this class for content
        const slides = gsap.utils.toArray(`.${slideClass}`);

        // Set container to block layout for vertical stacking
        gsap.set(container, { display: 'block' });

        // Calculate total height to scroll
        let totalSlidesHeight = 0;
        slides.forEach(slide => {
            totalSlidesHeight += slide.offsetHeight;
        });

        // Adjust scroll amount for vertical pinning
        // The vertical space needed is the sum of all slide heights minus one viewport height,
        // because the first slide fills the viewport and then subsequent slides scroll up.
        const scrollAmount = totalSlidesHeight - window.innerHeight;

        if (scrollAmount <= 0) {
            // If content fits within one viewport, no vertical scroll needed
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === wrapper) {
                    st.kill();
                }
            });
            return;
        }

        // Main vertical scroll animation
        const verticalScrollTween = gsap.to(container, {
            y: -scrollAmount, // Move container upwards (negative y)
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${scrollAmount}`,
                invalidateOnRefresh: true,
                // markers: true, // Uncomment for debugging main scroll trigger
            }
        });

        // Animate image and text within each vertical slide
        slides.forEach((slide, i) => {
            const img = slide.querySelector('.animated-image');
            const text = slide.querySelector('p');

            // Ensure initial state for elements that will animate
            gsap.set([img, text], { opacity: 0, y: 50, scale: 0.8 }); // Initial state for vertical entry

            const slideContentTL = gsap.timeline({
                scrollTrigger: {
                    trigger: slide,
                    containerAnimation: verticalScrollTween, // Linked to the main vertical scroll
                    start: "top bottom", // Start animating when the top of the slide enters the bottom of the viewport
                    end: "bottom top", // End animating when the bottom of the slide leaves the top of the viewport
                    scrub: true,
                    // markers: {startColor: "blue", endColor: "red", indent: 200 * i}, // Uncomment for debugging each slide's content trigger
                }
            });

            // Entry animation
            slideContentTL.to([img, text], { opacity: 1, y: 0, scale: 1, ease: 'power2.out' }, 0);
            // Exit animation
            slideContentTL.to([img, text], { opacity: 0, y: -50, scale: 0.8, ease: 'power2.out' }, 0.8);
        });
    }


    // Setup scrolling for each relevant section
    setupHorizontalScroll('history-scroll-wrapper', 'history-slide', 'left'); // History scrolls right (content moves left)
    setupVerticalScroll('algorithm-scroll-wrapper', 'algorithm-slide'); // Algorithm scrolls up
    setupHorizontalScroll('info-scroll-wrapper', 'info-slide', 'right'); // Info scrolls left (content moves right)


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
