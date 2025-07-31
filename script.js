gsap.registerPlugin(ScrollTrigger);

function setupHorizontalScroll(wrapperId, slideClass) {
  const container = document.getElementById(wrapperId);
  const slides = container.querySelectorAll(`.${slideClass}`);

  // Register a ScrollTrigger with ID for containerAnimation
  ScrollTrigger.create({
    id: wrapperId,
    trigger: container,
    pin: true,
    scrub: 1,
    end: () => "+=" + container.querySelector(".horizontal-content-container").offsetWidth,
  });

  gsap.to(slides, {
    xPercent: -100 * (slides.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      scrub: 1,
      pin: true,
      end: () => "+=" + container.querySelector(".horizontal-content-container").offsetWidth,
    }
  });

  slides.forEach((slide) => {
    const image = slide.querySelector(".image");
    const text = slide.querySelector(".text");

    gsap.fromTo(
      [image, text],
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: slide,
          containerAnimation: ScrollTrigger.getById(wrapperId),
          start: "left center",
          end: "right center",
          toggleActions: "play none none reverse",
        }
      }
    );
  });
}

function setupVerticalScroll(wrapperId, slideClass) {
  const container = document.getElementById(wrapperId);
  const slides = container.querySelectorAll(`.${slideClass}`);

  ScrollTrigger.create({
    id: wrapperId,
    trigger: container,
    pin: true,
    scrub: 1,
    end: () => "+=" + container.querySelector(".horizontal-content-container").offsetHeight,
  });

  gsap.to(slides, {
    yPercent: -100 * (slides.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      scrub: 1,
      pin: true,
      end: () => "+=" + container.querySelector(".horizontal-content-container").offsetHeight,
    }
  });

  slides.forEach((slide) => {
    const image = slide.querySelector(".image");
    const text = slide.querySelector(".text");

    gsap.fromTo(
      [image, text],
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: slide,
          containerAnimation: ScrollTrigger.getById(wrapperId),
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
        }
      }
    );
  });
}

// Call setup functions
setupHorizontalScroll("history-scroll-wrapper", "history-slide");
setupVerticalScroll("algorithm-scroll-wrapper", "algorithm-slide");
