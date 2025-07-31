gsap.registerPlugin(ScrollTrigger);

// Basic horizontal scroll working setup
const container = document.getElementById("history-scroll-wrapper");
const slides = container.querySelectorAll(".history-slide");

gsap.to(slides, {
  xPercent: -100 * (slides.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: 1,
    start: "top top",
    end: () => "+=" + container.scrollWidth
  }
});

// Image & text fade/zoom animation
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
        start: "left center",
        end: "right center",
        scrub: true
      }
    }
  );
});
