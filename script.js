document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const scrollSetups = [
    {
      wrapperId: "history-scroll-wrapper",
      slideClass: "history-slide",
      type: "horizontal"
    },
    {
      wrapperId: "algorithm-scroll-wrapper",
      slideClass: "algorithm-slide",
      type: "vertical"
    },
    {
      wrapperId: "info-scroll-wrapper",
      slideClass: "info-slide",
      type: "horizontal"
    }
  ];

  scrollSetups.forEach(({ wrapperId, slideClass, type }) => {
    const container = document.getElementById(wrapperId);
    const slides = container.querySelectorAll(`.${slideClass}`);

    // Skip if no slides found
    if (!slides.length) return;

    const isHorizontal = type === "horizontal";

    // Scroll animation
    const animation = gsap.to(slides, {
      xPercent: isHorizontal ? -100 * (slides.length - 1) : 0,
      yPercent: !isHorizontal ? -100 * (slides.length - 1) : 0,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () =>
          "+=" +
          (isHorizontal
            ? container.offsetWidth * slides.length
            : container.offsetHeight * slides.length),
        markers: false
      }
    });

    // Animate image + text inside each slide
    slides.forEach((slide) => {
      const image = slide.querySelector(".image img");
      const text = slide.querySelector(".text");

      if (image && text) {
        gsap.fromTo(
          [image, text],
          {
            opacity: 0,
            scale: 0.8
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: slide,
              containerAnimation: animation,
              start: "left center",
              toggleActions: "play none none reverse",
              markers: false
            }
          }
        );
      }
    });
  });
});
