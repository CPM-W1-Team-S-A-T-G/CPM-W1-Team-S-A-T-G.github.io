slides.forEach((slide, i) => {
    // Check if this is the first history slide for our test drive
    const isFirstHistorySlide = slide.classList.contains('history-slide') && i === 0;

    const img = slide.querySelector('.animated-image'); // This will now select the first one found
    const text = slide.querySelector('p'); // This will now select the first one found

    // If implementing the new structure, you'd select the new elements:
    const mainImageView = slide.querySelector('.slide-main-view');
    const mainImage = slide.querySelector('.main-image');
    const mainText = slide.querySelector('.main-text');

    const detailView = slide.querySelector('.slide-detail-view');
    const zoomOverlay = slide.querySelector('.zoom-reveal-overlay');
    const detailImage = slide.querySelector('.detail-image');
    const detailText = slide.querySelector('.detail-text');

    // Initial state: Set all new elements to hidden/start state
    gsap.set([detailView, zoomOverlay, detailImage, detailText], { opacity: 0 });
    gsap.set(zoomOverlay, { scale: 0, xPercent: -50, yPercent: -50, transformOrigin: "center center" }); // For a center-out reveal

    const slideContentTL = gsap.timeline({
        scrollTrigger: {
            trigger: slide,
            containerAnimation: horizontalScrollTween,
            start: "left 100%", // When the left edge of the slide enters the viewport
            end: "right 0%",   // When the right edge of the slide leaves the viewport
            scrub: true,
            // markers: {startColor: "purple", endColor: "orange", indent: 200 * i}, // Keep for debugging!
        }
    });

    // --- Animation Sequence for the First History Slide ---
    if (isFirstHistorySlide) {
        // Phase 1: Main image and text enter (similar to current, but now for the 'main-view')
        slideContentTL.to(mainImageView, { opacity: 1, ease: 'power2.out' }, 0); // Fade in the whole main view
        slideContentTL.fromTo(mainImage,
            { scale: 0.8, opacity: 0.5 },
            { scale: 1, opacity: 1, ease: 'power2.out' }, 0 // Scale in the main image slightly
        );
        slideContentTL.fromTo(mainText,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, ease: 'power2.out' }, 0.1 // Fade in and slide up text shortly after
        );

        // Phase 2: Zoom into the main image and reveal detail view
        // This will happen as the scroll progresses *through* this slide
        // Adjust the numeric values (e.g., 0.3, 0.4, 0.5) to control timing relative to the slide's scroll progress
        slideContentTL.to(mainImage, {
            scale: 1.2, // Zoom into the image
            // You might also need to adjust x, y, or use clipPath here if the zoom is to a specific point
            ease: 'power1.inOut'
        }, 0.3); // Start zoom at 30% of the slide's horizontal scroll journey

        // Reveal the "black spot" overlay from the center
        slideContentTL.to(zoomOverlay, {
            opacity: 1,
            scale: 1,
            ease: 'power2.in',
        }, 0.4); // Start reveal at 40%

        // Hide the main view and show the detail view
        slideContentTL.to(mainImageView, { opacity: 0, duration: 0.01 }, 0.45); // Immediately hide main view
        slideContentTL.to(detailView, { opacity: 1, duration: 0.01 }, 0.45); // Immediately show detail view

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
        slideContentTL.to([detailImage, detailText], {
            opacity: 0,
            ease: 'power2.out'
        }, 0.9); // Start fading out towards the end of the slide's journey
    } else {
        // Keep the original animation for other slides for now
        // Ensure initial state for elements that will animate
        gsap.set([img, text], { opacity: 0 });

        // Create a timeline for each slide's content to control its reveal and conceal
        // This timeline will be controlled by the main horizontal scroll
        slideContentTL.to(img, { opacity: 1, scale: 1, ease: 'power2.out' }, 0);
        slideContentTL.to(text, { opacity: 1, y: 0, ease: 'power2.out' }, 0);

        slideContentTL.to(img, { opacity: 0, scale: 0.8, ease: 'power2.out' }, 0.8);
        slideContentTL.to(text, { opacity: 0, y: -20, ease: 'power2.out' }, 0.8);
    }
});
