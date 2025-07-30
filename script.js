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
            // Check if this is the first history slide for our test drive
            const isFirstHistorySlide = slide.classList.contains('history-slide') && i === 0;

            // Select elements for the new, more complex animation
            const mainImageView = slide.querySelector('.slide-main-view');
            const mainImage = slide.querySelector('.main-image');
            const mainText = slide.querySelector('.main-text');

            const detailView = slide.querySelector('.slide-detail-view');
            const zoomOverlay = slide.querySelector('.zoom-reveal-overlay');
            const detailImage = slide.querySelector('.detail-image');
            const detailText = slide.querySelector('.detail-text');

            // Set initial state for new elements
            gsap.set([detailView, zoomOverlay, detailImage, detailText], { opacity: 0, pointerEvents: 'none' }); // Hide detail view initially
            gsap.set(zoomOverlay, { scale: 0, xPercent: -50, yPercent: -50, transformOrigin: "center center" }); // For a center-out reveal

            // Elements for existing simple animation (used for other slides)
            const img = slide.querySelector('.animated-image');
            const text = slide.querySelector('p');
            // Ensure initial state for elements that will animate (for non-test-drive slides)
            if (!isFirstHistorySlide) {
                gsap.set([img, text], { opacity: 0 });
            }


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

            // --- Animation Sequence for the First History Slide ---
            if (isFirstHistorySlide) {
                // Phase 1: Main image and text enter
                slideContentTL.to(mainImageView, { opacity: 1, ease: 'power2.out' }, 0); // Ensure main view is visible
                slideContentTL.fromTo(mainImage,
                    { scale: 0.8, opacity: 0.5 },
                    { scale: 1, opacity: 1, ease: 'power2.out' }, 0 // Scale in the main image slightly
                );
                slideContentTL.fromTo(mainText,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, ease: 'power2.out' }, 0.1 // Fade in and slide up text shortly after
                );

                // Phase 2: Zoom into the main image and reveal detail view
                // These timings (0.3, 0.4, 0.45, 0.5, 0.6) are percentages of the slide's active scroll duration.
                // Adjust them to fine-tune when each part of the animation occurs.
                slideContentTL.to(mainImage, {
                    scale: 1.2, // Zoom into the image
                    // You might adjust x and y here to zoom into a specific point if your image has one.
                    ease: 'power1.inOut'
                }, 0.3); // Start zoom at 30% of the slide's horizontal scroll journey

                // Reveal the "black spot" overlay from the center
                slideContentTL.to(zoomOverlay, {
                    opacity: 1,
                    scale: 1,
                    ease: 'power2.in',
                    pointerEvents: 'auto' // Make it interactive if needed
                }, 0.4); // Start overlay reveal at 40%

                // Instantly hide main view and show detail view
                slideContentTL.to(mainImageView, { opacity: 0, duration: 0.01, pointerEvents: 'none' }, 0.45);
                slideContentTL.to(detailView, { opacity: 1, duration: 0.01, pointerEvents: 'auto' }, 0.45);

                // Fade out the "black spot" and fade in the detail image and text
                slideContentTL.to(zoomOverlay, { opacity: 0, ease: 'power2.out' }, 0.5); // Fade out overlay at 50%
                slideContentTL.fromTo(detailImage,
                    { scale: 0.9, opacity: 0 },
                    { scale: 1, opacity: 1, ease: 'power2.out' }, 0.5 // Detail image fades in
                );
                slideContentTL.fromTo(detailText,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, ease: 'power2.out' }, 0.6 // Detail text fades in shortly after
                );

                // Phase 3: All content for this slide fades out as it leaves the screen
                slideContentTL.to([detailImage, detailText, zoomOverlay], { // Fade out all relevant elements
                    opacity: 0,
                    ease: 'power2.out',
                    pointerEvents: 'none'
                }, 0.9); // Start fading out towards 90% of the slide's journey
            } else {
                // Original animation for other slides
                slideContentTL.to(img, { opacity: 1, scale: 1, ease: 'power2.out' }, 0);
                slideContentTL.to(text, { opacity: 1, y: 0, ease: 'power2.out' }, 0);

                slideContentTL.to(img, { opacity: 0, scale: 0.8, ease: 'power2.out' }, 0.8);
                slideContentTL.to(text, { opacity: 0, y: -20, ease: 'power2.out' }, 0.8);
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
