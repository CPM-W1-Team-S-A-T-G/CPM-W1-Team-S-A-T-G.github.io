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

function setupScrollSection(wrapperId, slideClass, direction = "right") {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const container = wrapper.querySelector('.horizontal-content-container');
    const slides = gsap.utils.toArray(`.${slideClass}`);

    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(container, { x: 0, y: 0 }));

    let totalSlidesWidth = 0;
    slides.forEach(slide => {
        totalSlidesWidth += slide.offsetWidth;
    });

    const scrollAmount = totalSlidesWidth - window.innerWidth;

    if (direction === "up") {
        // Vertical scroll – no pinning
        slides.forEach((slide, i) => {
            const img = slide.querySelector('.animated-image');
            const text = slide.querySelector('p');

            gsap.set([img, text], { opacity: 0, y: 20 });

            gsap.timeline({
                scrollTrigger: {
                    trigger: slide,
                    start: "top 80%",
                    end: "bottom 60%",
                    scrub: true,
                    // markers: true,
                }
            })
            .to(img, { opacity: 1, scale: 1, ease: 'power2.out' }, 0)
            .to(text, { opacity: 1, y: 0, ease: 'power2.out' }, 0);
        });

        return; // Skip pinning logic
    }

    // Horizontal scroll (right or left)
    const xDistance = direction === "right" ? -scrollAmount : scrollAmount;

    const horizontalTween = gsap.to(container, {
        x: xDistance,
        ease: "none",
        scrollTrigger: {
            trigger: wrapper,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollAmount}`,
            invalidateOnRefresh: true,
            // markers: true,
        }
    });

    slides.forEach((slide, i) => {
        const img = slide.querySelector('.animated-image');
        const text = slide.querySelector('p');

        gsap.set([img, text], { opacity: 0 });

        const slideContentTL = gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontalTween,
                start: "left 100%",
                end: "right 0%",
                scrub: true,
                // markers: true,
            }
        });

        slideContentTL.to(img, { opacity: 1, scale: 1, ease: 'power2.out' }, 0);
        slideContentTL.to(text, { opacity: 1, y: 0, ease: 'power2.out' }, 0);
        slideContentTL.to(img, { opacity: 0, scale: 0.8, ease: 'power2.out' }, 0.8);
        slideContentTL.to(text, { opacity: 0, y: -20, ease: 'power2.out' }, 0.8);
    });
}


setupScrollSection('history-scroll-wrapper', 'history-slide', 'right');
setupScrollSection('algorithm-scroll-wrapper', 'algorithm-slide', 'left');
setupScrollSection('info-scroll-wrapper', 'info-slide', 'up');


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
